import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/common/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma:PrismaService){}
  create(dto: CreateCommentDto,user:user,sid:number) {
   return this.prisma.comment.create({
      data: {
        ...dto,
        soft:{connect:{id:+sid}},
        user:{connect:{id:user.id}}
      }
    })
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
