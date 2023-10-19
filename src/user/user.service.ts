import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma.service';
import { UserPassword } from './dto/password.dto';
import { hash } from 'argon2';
import { UserResponse } from './user.response';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll(page=1,row=10) {
    const total = await this.prisma.user.count()
    const data = await this.prisma.user.findMany({
      skip:(page-1)*row,
      take:row,
      orderBy:{
        id:'desc'
      }
    })
    if(data?.length>0){
      data.forEach(item=>{
        new UserResponse(item).make()
      })
    }
    return {
      meta:{page,row,total},
      data
    }

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...dto }
    });
  }

  async updatePassword(id: number, dto: UserPassword) {
    return this.prisma.user.update({
      where: { id },
      data: { password: await hash(dto.password) }
    });
  }

  remove(id: number) {
    return this.prisma.user.deleteMany({
      where: { id
        }
    })
  }
}
