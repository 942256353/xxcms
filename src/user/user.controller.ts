import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client'
import { JsonResponse } from 'src/core/json.response';
import { UserResponse } from './user.response';
import { UserPassword } from './dto/password.dto';
import { Admin } from 'src/auth/admin.decorator';

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
  @Get()
  @Auth()
  findAll(@Query('page') page: number = 1, @Query('row') row: number = 10) {
    return this.userService.findAll(+page, +row);
  }

  @Put('update')
  async update(@Body() dto: any, @CurrentUser() user: user) {
    const id = user?.id?user.id:dto.id
    await this.userService.update(id, dto)
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

  @Delete('delete/:id')
  @Admin()
  async remove(@Param('id') id: number) {
    await this.userService.remove(+id)
    return {
      code: 200,
      message: '删除成功'
    }
  }
}