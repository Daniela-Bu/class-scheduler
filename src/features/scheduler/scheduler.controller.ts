import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AddClassDto } from './dto/add-class-payload.dto';
import { SchedulerService } from './scheduler.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FindClassesByDayDto } from './dto/find-classes-by-day-payload.dto';
import { SignForClassDto } from './dto/sign-for-class-payload.dto';
import { RegisterDto } from './dto/register-payload.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { FindTutorsClassesDto } from './dto/find-tutors-classes-payload.dto';
import { UnsignClassDto } from './dto/unsighn-class-payload.dto';
import { Role } from 'src/core/enums';
import { Roles } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';

@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {
    constructor(private readonly service: SchedulerService) { }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Post('register')
    public async register(@Req() req, @Body() body: RegisterDto) {
        return this.service.register(req.userToken, body);
    }

    @ApiBearerAuth()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    public async addClass(@Req() req, @Body() body: AddClassDto) {
        return await this.service.addClass(req.userToken.name, body);
    }

    @Get('find-classes-by-day')
    public async findClassesByDay(@Query() query: FindClassesByDayDto) {
        return await this.service.findClassesByDay(query.day);
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('sign-for-class')
    public async signForClass(@Req() req, @Query() query: SignForClassDto) {
        return this.service.signForClass(req.userToken, query);
    }

    @ApiBearerAuth()
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('unsign-class')
    public async unsignClass(@Req() req, @Query() query: UnsignClassDto) {
        return this.service.unsignClass(req.userToken, query);
    }

    @ApiBearerAuth()
    @Roles(Role.USER, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    @Get('find-users-classes')
    public async findClassesByUser(@Req() req, @Query() query) {
        const classes = this.service.findClassesByUser(req.userToken);
        if (!classes) {
            throw new HttpException('Class doesn`t exist', HttpStatus.NOT_FOUND);
        }

        return classes;
    }

    @Get('find-tutors-classes')
    public async findTutorsClasses(@Query() query: FindTutorsClassesDto) {
        const classes = this.service.findTutorsClasses(query);
        if (!classes) {
            throw new HttpException('Class doesn`t exist', HttpStatus.NOT_FOUND);
        }

        return classes;
    }

}
