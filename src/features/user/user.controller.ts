import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetUserPayloadDto } from './dto/get-user-payload.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Cron } from '@nestjs/schedule';
import { CreateUserPayloadDto, VerificationQuestionDto } from './dto/create-user-payload.dto';
import { User } from '../mongodb/schemas';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly service: UserService) {}

    @Post()
    @ApiCreatedResponse()
    @ApiBadRequestResponse()
    public async createUser(@Body() body: CreateUserPayloadDto, @Query() query: VerificationQuestionDto): Promise<User> {
        try {
            const pass = body.password;
            const newUser = await this.service.createUser(body, query);
            newUser.password = pass.replace(/./g, "*");
            
            return newUser;
        } catch(err) {
            throw err;
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
        const { username, name, roles } = req.userToken;

        return this.service.deleteUser({userName: username, name, roles});
    }

    @Cron("1 0 * * 0")
    async resetClassesLeftForWeek() {
        this.service.resetClassesLeftForWeek();
    }
    
}
