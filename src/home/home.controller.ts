import { Controller, Get, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseHomeDto } from './dto/response.home.dto';
import { ResponseSimpleCombDto } from './dto/response.simple-comb.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionPackage } from '../general/exception.filter';
import {
  ApiOkResponseWrapped,
  ApiOkResponseWrappedArray,
} from '../general/api.response.dto';

@ApiTags('HOME')
@UseGuards(LoggedInGuard)
@Controller('home')
@ApiResponse({
  status: 401,
  type: ExceptionPackage,
  description: '접근 권한이 없습니다.',
})
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({ summary: 'home 화면에 필요한 정보를 제공' })
  @ApiOkResponseWrapped(ResponseHomeDto)
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '자가진단이 완료되어야 홈 화면을 불러올 수 있습니다.',
  })
  async getHome(@User() user): Promise<ResponseHomeDto> {
    return await this.homeService.getHome(user);
  }

  @Get('myCombs')
  @ApiOperation({ summary: '조합과 그에 속하는 제품 시리얼들을 제공' })
  @ApiOkResponseWrappedArray(ResponseSimpleCombDto)
  async getCombList(@User() user): Promise<ResponseSimpleCombDto[]> {
    return await this.homeService.getSimpleCombList(user);
  }
}
