import { Body, Controller, Delete, Get, Post, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { CreateUserPayloadDto } from './dto/create-user-payload.dto';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserPayloadDto } from './dto/get-user-payload.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Cron, CronExpression } from '@nestjs/schedule';
import { log } from 'console';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    @ApiCreatedResponse()
    @ApiBadRequestResponse()
    public async createUser(@Body() body: CreateUserPayloadDto) {
        try {
            return this.service.createUser(body);
        } catch(err) {
            return JSON.parse(err.message)
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    @ApiOkResponse()
    public async findUser(@Query() query: GetUserPayloadDto) {
        try {
            return this.service.findUser(query.userName);
        } catch(err) {
            return JSON.parse(err.message);
        }
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete()
    public async deleteUser(@Req() req) {
        const { username, name, role } = req.userToken;

        return this.service.deleteUser({userName: username, name, role});
    }

    @Cron("1 0 * * 0")
    async resetClassesLeftForWeek() {
        this.service.resetClassesLeftForWeek();
    }
    
}
