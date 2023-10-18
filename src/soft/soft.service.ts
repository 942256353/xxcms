import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';
import { PrismaService } from 'src/common/prisma.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client';
import fs from 'fs';
import { SoftResponse } from './soft.response';

@Injectable()
export class SoftService {
  constructor(private prisma: PrismaService){ }
  create(data: CreateSoftDto, user: user) {
    return this.prisma.soft.create({
      data
    })
  }

  async findAll(page=1,row=10) {
    const total = await this.prisma.soft.count()
    const data = await this.prisma.soft.findMany({
      skip:(page-1)*row,
      take:row,
      orderBy:{
        id:'desc'
      }
    })
    if(data?.length>0){
      data.forEach(item=>{
        new SoftResponse(item).make()
      })
    }
    return {
      meta:{page,row,total},
      data
    }

  }

  async findOne(id: number) {
    const soft =await this.prisma.soft.findFirst({
      where:{id}
    });
    const response = new SoftResponse(soft).make()
    return response
  }

  update(id: number, dto: UpdateSoftDto) {
    return this.prisma.soft.update({
      where:{id},
      data:{...dto}
    });
  }

  async remove(id: number) {
    try {
      const soft = await this.prisma.soft.findFirst({
        where:{id}
      })
      fs.unlinkSync(soft.filePath)
      return this.prisma.soft.deleteMany({
        where:{id}
      })
    } catch (error) {
      throw new BadRequestException({
        "error":"Bad request",
        "message":'删除失败',
        "statusCode":400
    })
    }
  }

  async download(id: number){
    try {
      const soft = await this.prisma.soft.findFirst({
        where:{id}
      })
      await this.prisma.soft.update({
        where:{id},
        data:{
          ...soft,
          download:soft.download+1
        }
      })
      return soft.filePath
    } catch (error) {
      return error
    }
  }
}
