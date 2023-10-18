import { Controller, Get, BadRequestException } from '@nestjs/common';
import { ConfigService } from './common/config.service';
import { Auth } from './auth/auth.decorator';
import { Admin } from './auth/admin.decorator';
import { PrismaService } from './common/prisma.service';

@Controller()
export class AppController {
    constructor(private readonly prisma: PrismaService, private configService: ConfigService) {

    }
    @Get('all')
    @Admin()
    async getAll() {
        try {
            // 获取当月的第一天和最后一天日期
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const userTotal = await this.prisma.user.count();
            const soft = await this.prisma.soft.findMany({})
            let downloadTotal = 0;
            if (soft.length > 0) {
                downloadTotal = soft.reduce((acc, cur) => acc + cur.download, 0)
            }
            const commentTotal = await this.prisma.comment.count({
                where: {
                    commentId: null
                }
            })
            const softTotal = await this.prisma.soft.count()
            // 查询当月下载数量
            const downloads = await this.prisma.soft.findMany({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                },
            });
            const currentMonthDownloads = downloads.reduce((acc, cur) => acc + cur.download, 0);
            // 查询当月注册用户数量
            const currentMonthUsers = await this.prisma.user.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                    id: {
                        not: 1
                    }
                },
            });
            // 查询当月软件发布数
            const currentMonthSofts= await this.prisma.soft.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                },
            });
            // 查询当月评论数
            const currentMonthComments = await this.prisma.comment.count({
                where: {
                    createdAt: {
                        gte: firstDayOfMonth,
                        lte: lastDayOfMonth,
                    },
                    commentId: null,
                },
            });
            return {
                downloadTotal:downloadTotal||0,
                commentTotal:commentTotal||0,
                softTotal:softTotal||0,
                userTotal:userTotal||0,
                currentMonthDownloads:currentMonthDownloads||0,
                currentMonthUsers:currentMonthUsers||0,
                currentMonthSofts:currentMonthSofts||0,
                currentMonthComments:currentMonthComments||0
            }
        } catch (error) {
            throw new BadRequestException({
                "error": "Bad request",
                "message": error,
                "statusCode": 400
            })
        }
    }
}
