import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../mongodb/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    public async createUser(params, verification): Promise<User> {
        try {
            const emailExists = await this.userModel.findOne({ email: params.email });
            if(emailExists) {
                throw new HttpException('Email already exist', HttpStatus.CONFLICT);
            }
            const usernameExists = await this.userModel.findOne({ userName: params.userName });
            if(usernameExists) {
                throw new HttpException('Username already exist', HttpStatus.CONFLICT);
            }

            const password = params.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            params.password = hash;
            params.classesLeftForWeek = params.maxClassesPerWeek;

            return await this.userModel.create({ ...params, ...verification });
        } catch (err) {
            throw err;
        }
    }

    public async findUser(filter) {
        try {
            return await this.userModel.findOne(filter);
        } catch (err) {
            throw err;
        }
    }

    public async resetPassword(user, newPassword) {
        const { userName, email } = user;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(newPassword, saltOrRounds);
        const update = { $set: { password: hash } };

        return await this.userModel.updateOne({ userName, email }, update);
    }

    public async deleteUser(userData) {
        return await this.userModel.deleteOne(userData);
    }

    public async resetClassesLeftForWeek() {
        const update = { $set: { classesLeftForWeek: 3 } }
        return await this.userModel.updateMany({}, update);
    }

    public async updateClassesLeftForWeek(userData, diff) {
        const user = await this.userModel.findOne(userData);
        if (user.classesLeftForWeek == 0) {
            throw new HttpException(`You have signed the maximum classes allowed for this week`, 419);
        }

        const update = { $inc: { classesLeftForWeek: diff } };
        
        return await this.userModel.updateOne(userData, update);
    }
}
