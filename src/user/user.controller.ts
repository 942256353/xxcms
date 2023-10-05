import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import {user} from '@prisma/client'
import { JsonResponse } from 'src/core/json.response';
import { UserResponse } from './user.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  info(@CurrentUser() user:user) {
    const response = new UserResponse(user).make()
    return response
    // return JsonResponse.handle(user,['password'])
  }
}
