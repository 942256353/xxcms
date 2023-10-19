import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/common/prisma.service';
import { user } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  create(createCommentDto: CreateCommentDto, user: user, sid: number, replyId?: number) {
    const { commentId, ...dto } = createCommentDto;
    return this.prisma.comment.create({
      data: {
        ...dto,
        replyId: dto.replyId ? +dto.replyId : commentId,
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
      include: { user: true, replys: { include: { user: true } } }
    });
    return comment;
  }
  async getList(page=1,row=10) {
  try {
    const total = await this.prisma.comment.count({
      where:{
        commentId:null
      }
    })
    const data = await this.prisma.comment.findMany({
      skip:(page-1)*row,
      take:row,
      orderBy:{
        id:'desc'
      },
      where:{
        commentId:null
      }
    })
    // if(data?.length>0){
    //   data.forEach(item=>{
    //     new SoftResponse(item).make()
    //   })
    // }
    let result = []
    if(data?.length>0){
      for(const item of data){
        const user =await this.prisma.user.findFirst({
          where:{
            id:item.userId
          }
        })
        const soft =await this.prisma.soft.findFirst({
          where:{
            id:item.softId
          }
        })
        result.push({...item,userName:user.nickname,softName:soft.name,softTitle:soft.title})
      }

    }
    return {
      meta:{page,row,total},
      data:result
    }
  } catch (error) {
    
  }

  }
  // async remove(id: number) {
  //   // 删除评论时，删除子评论
  //   const comment = await this.prisma.comment.findUnique({
  //     where: { id },
  //     include: { replys: true }
  //   })
  //   if (comment.replys.length > 0) {
  //     return this.prisma.comment.deleteMany({
  //       where: {
  //         OR:[{id},{commentId: comment.replys[0].commentId },{replyId: id}]
  //       }
  //     });
  //   } else {
  //     return this.prisma.comment.deleteMany({
  //       where: {
  //         OR:[{id},{replyId: id}]
  //       }
  //     })
  //   }
  // }
  async remove(id: number) {
    let that = this
    // 递归删除评论及其回复
    async function deleteCommentsRecursive(comment) {
      const replys = await that.prisma.comment.findMany({
        where: {
          replyId: comment.id
        }
      })
      // 删除当前评论及其直接回复
      await that.prisma.comment.deleteMany({
        where: {
          OR: [
            { id: comment.id },
            { replyId: comment.id }
          ]
        }
      });
      if (replys?.length > 0) {
        for (const reply of replys) {
          await deleteCommentsRecursive(reply);
        }
      }
    }

    // 查找要删除的评论及其回复
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { replys: true }
    });
    // 调用递归函数删除评论及其回复
    await deleteCommentsRecursive(comment);

  }

}
