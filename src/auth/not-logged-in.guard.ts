import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggedInException } from '../general/base.exception';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const res = request.isAuthenticated();

    if (res) throw new LoggedInException('로그인된 유저는 접근할 수 없습니다.');
    else return true;
  }
}
