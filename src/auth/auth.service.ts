import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { PrismaService } from 'src/common/prisma.service';
import { hash } from 'argon2';
import { validateFail } from 'src/validate/helper';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name:dto.name,
        password:await hash(dto.password)
      }
    })
    return user;
  }

  async login(dto: loginDto) {
    const user = await this.prisma.user.findFirst ({
      where: {
        OR:[{name:dto.name},{email:dto.name},{mobile:dto.name}]
      }
    })
    // if(!user) validateFail('name','账号不存在')
    return user;
  }
}
