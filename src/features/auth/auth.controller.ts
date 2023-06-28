
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgotMyPasswordDto } from './dto/forgot-my-password-payload.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }

  @Post('password-reset')
  public forgotMyPassword(@Body() body: ForgotMyPasswordDto) {
    return this.authService.forgotMyPassword({
      name: body.name,
      userName: body.userName,
      email: body.email
    }, body.newPassword);
  }
}