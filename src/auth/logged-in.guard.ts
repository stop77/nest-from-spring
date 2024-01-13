import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotLoggedInException } from '../general/base.exception';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const res = request.isAuthenticated();
    if (res) return true;
    else throw new NotLoggedInException('접근 권한이 없습니다');
  }
}
