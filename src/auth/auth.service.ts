import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { PrismaService } from 'src/common/prisma.service';
import { hash,verify } from 'argon2';
import { validateFail } from 'src/validate/helper';
import { user } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private jwt: JwtService) { }
  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        nickname: dto.name,
        password: await hash(dto.password)
      }
    })
    return {
      name: user.name,
      token: this.token(user)
    }
  }

  private token(user: user) {
    return this.jwt.sign({ id: user.id })
  }

  async login(dto: loginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: dto.name }, { email: dto.name }, { mobile: dto.name }]
      }
    })
    if(!await verify(user.password,dto.password)) validateFail('password','密码错误')
    return {
      token:this.token(user)
    }
  }
}
