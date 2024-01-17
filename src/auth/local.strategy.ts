import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { NotValidInputException } from '../general/base.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'uniqId', passwordField: 'password' });
  }

  async validate(uniqId: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(uniqId, password);
    if (!user) {
      throw new NotValidInputException(
        '로그인에 실패했습니다. 아이디와 비밀번호를 정확히 입력했는지 확인해 주세요.',
      );
    }

    return done(null, user);
  }
}
