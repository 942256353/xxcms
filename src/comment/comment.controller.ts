import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client';
import { Auth } from 'src/auth/auth.decorator';
import { Policy } from 'src/policy/policy.decorator';
import { CommentPolicy } from './comment.policy';
import { PolicyGuard } from 'src/policy/policy.guard';
import { CommentResponse } from './comment.response';
import { Throttle } from '@nestjs/throttler';

@Controller('comment/:sid')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @Auth()
  @Throttle({ default: { limit: 10, ttl: 5000 } })
  async create(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: user, @Param('sid') sid: number) {
    const comment = await this.commentService.create(createCommentDto, user, +sid)
    return new CommentResponse(comment).make()
  }

  @Get()
  @Auth()
  async findAll(@Param('sid') sid: number) {
    console.log(sid)
    const comments = await this.commentService.findAll(+sid);
    return comments.map(comment => {
      return new CommentResponse(comment).make()
    })
  }


  @Delete(':id')
  //登录 你是评论的作者 管理员
  //守卫 执行验证
  @UseGuards(PolicyGuard)
  //元数据 提供给守卫
  @Policy(CommentPolicy)
  //获取身份 登录
  @Auth()
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
