import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { now } from 'lodash';
import md5 from 'md5';
import svgCaptcha from 'svg-captcha';

@Injectable()
export class CaptchaService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) { }
  async create(ip: string) {
    const key = md5('captcha' + now()+ip)
    const captCha = svgCaptcha.createMathExpr({ mathMin: 0, mathMax: 9, color: true, size: 4, noise: 3, width: 120, height: 40 })
    await this.cache.set(key, captCha.text, 1000 * 60 * 10)
    return {
      key,
      svg: captCha.data,
    }
  }

  async verify({ key, value }) {
    const cache = await this.cache.get(key)
    if (cache !== value) {
      throw new BadRequestException('验证码错误')
    }
  }
}
