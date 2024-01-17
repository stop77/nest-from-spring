import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RequestJoinDto } from './dto/request.join.dto';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { User } from '../general/decorator/user.decorator';
import { User as UserType } from '../entities/User';
import { Roles } from '../general/decorator/role.decorator';
import { UserRoleEnum } from '../entities/User';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(NotLoggedInGuard)
  @Post('join')
  async createUser(@Body() dto: RequestJoinDto): Promise<void> {
    return await this.userService.createUser(
      dto.uniqId,
      dto.password,
      dto.nick,
      dto.birth,
      dto.sex,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Roles([UserRoleEnum.USER])
  @Post('login')
  async login(): Promise<void> {}

  @Post('adminLogin')
  async adminLogin(@User() user: UserType) {
    if (user.id === '1') {
      SetMetadata('roles', UserRoleEnum.ADMIN);
    } else throw new UnauthorizedException();
  }

  @UseGuards(LoggedInGuard)
  @Post('logout')
  logOut(@Req() req, @Res() res): void {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }

  @UseGuards(LoggedInGuard)
  @Post('delete')
  async delete(@User() user, @Req() req, @Res() res): Promise<void> {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');

    await this.userService.deleteUser(user.uniqId);
  }
}
