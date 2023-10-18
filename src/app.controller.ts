import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './common/config.service';
import { Auth } from './auth/auth.decorator';
import { Admin } from './auth/admin.decorator';
import { PrismaService } from './common/prisma.service';

@Controller()
export class AppController {
    constructor(private prisma: PrismaService, private configService: ConfigService) {

    }
    @Get('all')
    @Admin()
    async getAll() {
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    not: 1
                }
            }
        });
        console.log(users);
    }
}
