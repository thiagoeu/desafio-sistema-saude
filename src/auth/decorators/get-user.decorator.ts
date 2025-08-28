import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * GetUser decorator
 * Permite acessar o usuário autenticado diretamente no controller
 * @param data - opcional, se quiser pegar um campo específico (ex: 'email')
 */
export const GetUser = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
