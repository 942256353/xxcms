import { PartialType } from '@nestjs/mapped-types';
import {RegisterDto} from './register.dto';
import {IsNotEmpty, Length, Matches}  from "class-validator";
import { IsExistsRule } from 'src/validate/is-exists';


export class loginDto extends PartialType(RegisterDto) {
    @IsNotEmpty({message:'用户名不能为空'})
    @Length(3,20,{message:'用户名长度必须为3-18位'})
    @IsExistsRule('user',['name','email','mobile'],{message:'账号不存在'})
    name:string;
}
