import { IsNotEmpty } from "class-validator";

export class CreateSoftDto {
    @IsNotEmpty({message:'软件标题不能为空'})
    title:string;
    @IsNotEmpty({message:'软件说明不能为空'})
    content:string;
    @IsNotEmpty({message:'附件不能为空'})
    filePath:string;
    @IsNotEmpty({message:'软件截图不能为空'})
    preview:string;
    @IsNotEmpty({message:'软件简介不能为空'})
    description:string;
    @IsNotEmpty({message:'软件版本不能为空'})
    version:string;
    @IsNotEmpty({message:'软件名字不能为空'})
    name:string;
}
