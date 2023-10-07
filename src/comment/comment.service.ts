import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/common/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  create(createCommentDto: CreateCommentDto, user: user, sid: number) {
    const { commentId, ...dto } = createCommentDto;
    return this.prisma.comment.create({
      data: {
        ...dto,
        soft: { connect: { id: +sid } },
        user: { connect: { id: user.id } },
        reply: commentId && { connect: { id: +commentId } }
      },
      include: {
        replys: true,
        user: true
      }
    })
  }

  async findAll(sid: number) {
    const comment = await this.prisma.comment.findMany({
      where: {
        softId: +sid,
        AND: [{ commentId: null }]
      },
      include: { user: true, replys: {include:{user:true}} }
    });
    return comment;
  }

  remove(id: number) {
    return this.prisma.comment.deleteMany({
      where: { id }
    });
  }
}
