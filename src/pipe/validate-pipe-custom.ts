import { ValidationError, ValidationPipe } from "@nestjs/common";

export class ValidatePipeCustom extends ValidationPipe{
    protected flattenValidationErrors(validationErrors: ValidationError[]): any[]{
        console.log(validationErrors);
         return validationErrors.map(error=>{
            return {field: error.property, message: Object.values(error.constraints)[0]}
        })
    }
}
