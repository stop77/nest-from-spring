import { Controller, Get, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseHomeDto } from './dto/response.home.dto';
import { ResponseSimpleCombDto } from './dto/response.simple-comb.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';

@UseGuards(LoggedInGuard)
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getHome(@User() user): Promise<ResponseHomeDto> {
    return await this.homeService.getHome(user);
  }

  @Get('myCombs')
  async getCombList(@User() user): Promise<ResponseSimpleCombDto[]> {
    return await this.homeService.getSimpleCombList(user);
  }
}
