import { Controller, Get, UseGuards } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseRecommendDto } from './dto/response.recommend.dto';
import { ResponseEssentialRecommendDto } from './dto/response.essential-recommend.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseWrapped } from '../general/api.response.dto';
import { ExceptionPackage } from '../general/exception.filter';

@ApiTags('RECOMMEND')
@UseGuards(LoggedInGuard)
@Controller('recommend')
export class RecommendController {
  constructor(private readonly recomService: RecommendService) {}

  @Get()
  @ApiOperation({
    summary: '추천 화면에 필요한 정보를 제공',
  })
  @ApiOkResponseWrapped(ResponseRecommendDto)
  @ApiResponse({
    status: 500,
    type: ExceptionPackage,
    description: '관리자에게 문의해 주세요.',
  })
  async getRecommend(@User() user): Promise<ResponseRecommendDto> {
    return await this.recomService.getRecommend(user);
  }

  @Get('essential')
  @ApiOperation({
    summary: '현재 점수를 바탕으로 추천 제품 목록 계산',
  })
  async getEssentialRecommend(
    @User() user,
  ): Promise<ResponseEssentialRecommendDto> {
    return await this.recomService.getEssentialRecommend(user);
  }
}
