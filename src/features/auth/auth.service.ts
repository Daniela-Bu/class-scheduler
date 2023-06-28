import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService) { }

    async signIn(userName: string, pass: string): Promise<any> {
        const user = await this.userService.findUser({userName});
        if(!user) {
            throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user._id, username: user.userName, name: user.name, role: user.role };

        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    async forgotMyPassword(userData, newPassword) {
        const user = await this.userService.findUser(userData);
        if(!user) {
            throw new HttpException('One of the details is incorrect', HttpStatus.NOT_FOUND);
        }

        return this.userService.resetPassword(userData, newPassword);
    }
}
