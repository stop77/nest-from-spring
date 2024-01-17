import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestJoinDto } from './dto/request.join.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../general/decorator/user.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiOkReponseNull } from '../general/api.response.dto';
import { ExceptionPackage } from '../general/exception.filter';
import { RequestLoginDto } from './dto/request.login.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '회원 가입',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: 'DTO 규격에 어긋난 입력값입니다.',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '이미 존재하는 아이디입니다.',
  })
  @UseGuards(NotLoggedInGuard)
  @Post('join')
  async createUser(@Body() dto: RequestJoinDto): Promise<void> {
    await this.userService.createUser(
      dto.uniqId,
      dto.password,
      dto.nick,
      dto.birth,
      dto.sex,
    );
  }

  @ApiOperation({
    summary: '로그인',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: 'DTO 규격에 어긋난 입력값입니다.',
  })
  @ApiResponse({
    status: 403,
    type: ExceptionPackage,
    description: '이미 로그인된 상태입니다.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: RequestLoginDto): Promise<void> {}

  @ApiOperation({
    summary: '로그아웃',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 403,
    type: ExceptionPackage,
    description: '로그인된 상태가 아닙니다.',
  })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  logOut(@Req() req, @Res() res): void {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }

  @ApiOperation({
    summary: '회원탈퇴',
  })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 403,
    type: ExceptionPackage,
    description: '로그인된 상태가 아닙니다.',
  })
  @UseGuards(LoggedInGuard)
  @Post('delete')
  async delete(@User() user, @Req() req, @Res() res): Promise<void> {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');

    await this.userService.deleteUser(user.uniqId);
  }
}
