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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
   return this.authService.register(dto);
  }
  @Post('login')
  login(@Body() dto: loginDto) {
   return this.authService.login(dto);
  }
  @Get('test')
  //@UseGuards(AuthGuard('jwt'),AdminGuard)
  // @Auth()
  @Admin()
  test(@CurrentUser() user: user){
    return user;
  }
}
