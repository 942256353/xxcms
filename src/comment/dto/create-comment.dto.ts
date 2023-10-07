import { Allow, IsNotEmpty, MaxLength } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty({message:'评论内容不能为空'})
    @MaxLength(1000,{message:'评论内容长度不能超过1000'})
    content:string;

    @Allow()
    commentId?:number;
}
