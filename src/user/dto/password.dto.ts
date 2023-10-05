import { IsNotEmpty } from "class-validator";
import { IsConfirmed } from "src/validate/is-confirmed";

export class UserPassword{
    @IsNotEmpty({message:'密码不能为空'})
    @IsConfirmed({message:'密码和确认密码不一致'})
    password: string;
}