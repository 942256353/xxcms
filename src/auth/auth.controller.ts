import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from './auth.decorator';
import { CurrentUser } from './current-user.decorator';
import { user } from '@prisma/client';
import { AdminGuard } from './admin.guard';
import { Admin } from './admin.decorator';
import { CaptchaService } from 'src/captcha/captcha.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly captcha: CaptchaService) { }
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    await this.captcha.verify(dto.captcha as any)
    return this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: loginDto) {
    await this.captcha.verify(dto.captcha as any)
    return this.authService.login(dto);
  }
  @Get('test')
  //@UseGuards(AuthGuard('jwt'),AdminGuard)
  // @Auth()
  @Admin()
  test(@CurrentUser() user: user) {
    return user;
  }
}
