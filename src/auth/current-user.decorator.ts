import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    (data:unknown,ctx:ExecutionContext):any => ctx.switchToHttp().getRequest().user
)