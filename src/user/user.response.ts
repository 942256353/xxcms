import { user } from "@prisma/client";
import { JsonResponse } from "src/core/json.response";

export class UserResponse extends JsonResponse<user>{
    protected hidden:(keyof user)[]=['password','id']
    public make(): user {
        super.make();
        return this.data;
    }
}