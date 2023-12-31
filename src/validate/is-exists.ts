import { PrismaClient } from '@prisma/client';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

//表字段是否唯一
export function IsExistsRule(table: string,fields:string[],validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsExistsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
       async validate(value: string, args: ValidationArguments) {
          const prisma = new PrismaClient();
          const res = await prisma[table].findFirst({
            where: {
              OR:fields.map(field=>({[field]:value}))
            }
          })
          return Boolean(res);
        },
      },
    });
  };
}