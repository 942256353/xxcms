import {IsNotEmpty, Length, Matches}  from "class-validator";
import { IsNotExistsRule } from "src/validate/is-not-exists";

export class RegisterDto {
    @IsNotEmpty({message:'用户名不能为空'})
    @Length(3,20,{message:'用户名长度必须为3-18位'})
    @Matches(/^[a-z]+$/i,{message:'用户名必须为字母'})
    @IsNotExistsRule('user',['name','email','mobile'],{message:'账号已经存在'})
    name:string;
    @IsNotEmpty({message:'密码不能为空'})
    @Length(6,20,{message:'密码长度必须为6-18位'})
    password:string;
}
