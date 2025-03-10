import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserPayload } from '@app/auth/infra';

export const CurrentUserDecorator = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserPayload;
  },
);
