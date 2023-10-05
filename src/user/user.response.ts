import { user } from "@prisma/client";
import { JsonResponse } from "src/core/json.response";

export class UserResponse extends JsonResponse<user>{
    protected hidden:(keyof user)[]=['password']
    public make(): user {
        super.make();
        this.data.avatar = this.data.avatar || '/public/assets/avatar.jpeg'
        return this.data;
    }
}