import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignForClassDto } from './dto/sign-for-class-payload.dto';
import { ObjectId } from 'mongodb';
import { Class, ClassTime } from '../mongodb/schemas';
import { findClassResponseDto } from './dto/find-class-response.dto';
import { UserService } from '../user/user.service';
import { days } from 'src/core/enums/days';

@Injectable()
export class SchedulerService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(ClassTime.name) private classTimeModel: Model<ClassTime>,
        private userService: UserService
    ) { }

    public async register(user, body) {
        let classExists = await this.classModel.findOne({ className: body.className, tutor: user.name });
        if (classExists) {
            throw new HttpException('Class already exists', HttpStatus.CONFLICT);
        }

        const newClass = {
            className: body.className,
            tutor: user.name,
            maxParticipants: body.maxParticipants,
        }

        return this.classModel.create(newClass);
    }

    public async addClass(user, body) {
        const info = [];

        let classExists = await this.findClass({
            className: body.className,
            tutor: user,
        });

        if (!classExists) {
            throw new HttpException('Register class first', HttpStatus.NOT_FOUND);
        }

        for (let timeSlot of body.time) {
            const date = new Date(timeSlot.date);
            const day = days[date.getDay()];
            const hour = date.getHours().toString();

            const timeSlotExists = await this.classTimeModel.findOne({
                day,
                hour,
            })
            if (timeSlotExists) {
                info.push(`Time slot is unavailable: ${day}, ${hour}`);
                continue;
            }

            const newTimeSlot = {
                classId: classExists._id,
                className: body.className,
                tutor: user.name,
                day: day,
                hour,
                date,
                duration: timeSlot.duration,
                parcipitants: [],
            }

            await this.classTimeModel.create(newTimeSlot);
            info.push(`Time slot added successfully: ${day}, ${hour}`);


        }

        return info;
    }

    async findClassesByDay(day: string) {
        return await this.classTimeModel.find({ day });
    }

    async signForClass(user, query: SignForClassDto) {
        try {
            const classData = {
                'className': query.name,
                'tutor': query.tutor,
            };
            const timeData = {
                'day': query.day,
                'hour': query.hour,
            };

            const wantedClassTime = await this.getClassTimeSlot(classData, timeData);

            if (wantedClassTime.data.participants.includes(user.name)) {
                throw new HttpException('You`re already signed for this class', HttpStatus.CONFLICT);
            }

            if (wantedClassTime.data.participants.length === wantedClassTime.maxParticipants) {
                throw new HttpException('Class is full', 418);
            }

            const updateQuery = { _id: new ObjectId(wantedClassTime.data._id) };
            const newData = {
                $push: { 'participants': user.name }
            }

            await this.userService.updateClassesLeftForWeek({ name: user.name, userName: user.username }, -1);

            return await this.classTimeModel.updateOne(updateQuery, newData);
        } catch (err) {
            throw err;
        }

    }

    public async unsignClass(user: any, query: any) {
        const classData = {
            'className': query.name,
            'tutor': query.tutor,
        };
        const timeData = {
            'day': query.day,
            'hour': query.hour,
        };

        const wantedClassTime = await this.getClassTimeSlot(classData, timeData);

        if (!wantedClassTime.data.participants.includes(user.name)) {
            throw new HttpException('You`re not signed for this class', HttpStatus.CONFLICT);
        }

        const update = { $pull: { participants: query.name } }
        await this.classTimeModel.updateOne({ classId: wantedClassTime.data.classId }, update);

        await this.userService.updateClassesLeftForWeek({ name: user.name, userName: user.username }, 1);
    }

    public async findClassesByUser(user) {
        return await this.classTimeModel.aggregate([
            {
                '$unwind': {
                    'path': '$participants'
                }
            }, {
                '$match': {
                    'participants': user.name
                }
            }
        ]);
    }

    public async findTutorsClasses(query) {
        return await this.classTimeModel.find({ query })
    }

    public async deleteClass(tutor, className) {
        try {
            const classToDelete = await this.classModel.findOne({ tutor, className });
            if(!classToDelete) {
                throw new HttpException('Class doesn`t exist', HttpStatus.NOT_FOUND);
            }
    
            const classTimes = await this.classTimeModel.find({ classId: classToDelete._id });
            if(classTimes.length) {
                await this.classTimeModel.deleteMany({ classId: classToDelete._id });
                for(let time of classTimes) {
                    for(let participant of time.participants) {
                        await this.userService.updateClassesLeftForWeek({ name: participant },1);
                    }
                }
            }
    
            await this.classModel.deleteOne({ tutor, className });
        } catch(err) {
            throw err;
        }
    }

    private async findClass(query): Promise<findClassResponseDto> {
        return await this.classModel.findOne(query);
    }

    private async findTimeSlot(query) {
        return await this.classTimeModel.findOne(query);
    }

    private async getClassTimeSlot(classData, timeData) {
        let wantedClass = await this.findClass(classData);

        if (!wantedClass) {
            throw new HttpException('Class doesn`t exist', HttpStatus.NOT_FOUND);
        }

        let wantedTimeSlot = await this.findTimeSlot({
            classId: new ObjectId(wantedClass._id),
            day: timeData.day,
            hour: timeData.hour,
        });

        if (!wantedTimeSlot) {
            throw new HttpException('Class doesn`t take place at this time slot', HttpStatus.NOT_FOUND);
        }

        return { data: wantedTimeSlot, maxParticipants: wantedClass.maxParticipants };
    }
}
