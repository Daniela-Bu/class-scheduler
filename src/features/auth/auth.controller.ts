
import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ForgotMyPasswordDto } from './dto/forgot-my-password-payload.dto';
import { query } from 'express';
import { VerificationQuestionDto } from '../user/dto/create-user-payload.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.userName, signInDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.userToken.name;
  }

  @Post('password-reset')
  public forgotMyPassword(@Body() body: ForgotMyPasswordDto, @Query() query: VerificationQuestionDto) {
    return this.authService.forgotMyPassword(body, query);
  }
}