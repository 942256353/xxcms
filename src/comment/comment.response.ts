import { comment, user } from "@prisma/client";
import { JsonResponse } from "src/core/json.response";
import { UserResponse } from "src/user/user.response";

export class CommentResponse extends JsonResponse<comment & {user:user,replys:comment[]}>{
    // protected hidden:(keyof user)[]=['password']
    public make(): comment & {user:user,replys:comment[]} {
        super.make();
        this.data.user = new UserResponse(this.data.user).make()
        if(this.data.replys){
            this.data.replys = this.data.replys.map((item)=>new CommentResponse(item as any).make())
        }
        // this.data.user = JsonResponse.handle(this.data.user,['password']);
        return this.data;
    }
}