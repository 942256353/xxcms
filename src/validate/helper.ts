import { BadRequestException } from "@nestjs/common"

export const validateFail = (field:string,message:string)=>{
    throw new BadRequestException({
        "error":"Bad request",
        "message":[
            {field,message}
        ],
        "statusCode":400
    })
}