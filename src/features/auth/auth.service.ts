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
        try {
            const user = await this.userService.findUser({ userName });
            if (!user) {
                throw new HttpException('Username does not exist', HttpStatus.NOT_FOUND);
            }

            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch) {
                throw new UnauthorizedException();
            }
            const tokenPayload = { sub: user._id, username: user.userName, name: user.name, roles: user.roles };

            return {
                accessToken: await this.jwtService.signAsync(tokenPayload)
            };
        } catch (err) {
            throw err;
        }
    }

    async forgotMyPassword(userData, verification) {
        const { newPassword } = userData;
        const user = await this.userService.findUser({ userName: userData.userName, email: userData.email });
        if (!user) {
            throw new HttpException('One of the details is incorrect', HttpStatus.NOT_FOUND);
        }
        if (user.answer !== verification.answer) {
            throw new HttpException('Wrong answer', HttpStatus.BAD_REQUEST);
        }

        return this.userService.resetPassword(userData, newPassword);
    }
}
