import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message:'评论内容不能为空'})
    content:string;
}
