import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client'
import { JsonResponse } from 'src/core/json.response';
import { UserResponse } from './user.response';
import { UserPassword } from './dto/password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('current')
  @Auth()
  info(@CurrentUser() user: user) {
    const response = new UserResponse(user).make()
    return response
    // return JsonResponse.handle(user,['password'])
  }
  @Put('update')
  @Auth()
  async update(@Body() dto: UpdateUserDto, @CurrentUser() user: user) {
    await this.userService.update(user.id, dto)
    // return {
    //   message: '更新成功'
    // }
  }

  @Put('password')
  @Auth()
  async password(@Body() dto: UserPassword, @CurrentUser() user: user) {
    await this.userService.updatePassword(user.id, dto)
    return {
      message: '密码更新成功'
    }
  }
}