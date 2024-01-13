import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RequestJoinDto } from './dto/request.join.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../general/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(NotLoggedInGuard)
  @Post('join')
  async createUser(@Body() dto: RequestJoinDto) {
    return this.userService.createUser(
      dto.uniqId,
      dto.password,
      dto.nick,
      dto.birth,
      dto.sex,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @UseGuards(LoggedInGuard)
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }

  @UseGuards(LoggedInGuard)
  @Post('delete')
  async delete(@User() user, @Req() req, @Res() res) {
    await this.userService.deleteUser(user.uniqId);
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
