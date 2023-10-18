import { soft } from "@prisma/client";
import { JsonResponse } from "src/core/json.response";

export class SoftResponse extends JsonResponse<soft>{
    protected hidden:(keyof soft)[]=['filePath']
    public make(): soft {
        super.make();
        return this.data;
    }
}