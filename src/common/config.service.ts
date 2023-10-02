import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';


@Injectable()
export class ConfigService {
  constructor(@Inject(config.KEY) public data:ConfigType<typeof config>){}
  public get(key:keyof ConfigType<typeof config>) {
   return this.data[key]
  }
    
  
}
