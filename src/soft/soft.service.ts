import { Inject, Injectable } from '@nestjs/common';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';
import { PrismaService } from 'src/common/prisma.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client';

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
    return {
      meta:{page,row,total},
      data
    }

  }

  findOne(id: number) {
    return this.prisma.soft.findFirst({
      where:{id}
    });
  }

  update(id: number, dto: UpdateSoftDto) {
    return this.prisma.soft.update({
      where:{id},
      data:{...dto}
    });
  }

  remove(id: number) {
    return this.prisma.soft.deleteMany({
      where:{id}
    })
  }
}
