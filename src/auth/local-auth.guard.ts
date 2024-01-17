import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotValidInputException } from '../general/base.exception';
import { validateClass } from '../general/validation';
import { RequestLoginDto } from '../user/dto/request.login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // Guard 사용 시 파이프의 에러 핸들링보다 에러가 먼저 터진다. 그래서 여기서 Validation 적용.
    if (!validateClass(req.body, RequestLoginDto))
      throw new NotValidInputException('입력 양식을 확인해 주세요.');
    else {
      const can = await super.canActivate(context);
      if (can) {
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
      }
      return true;
    }
  }
}
