import { Controller, Get } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseRecommendDto } from './dto/response.recommend.dto';
import { ResponseEssentialRecommendDto } from './dto/response.essential-recommend.dto';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recomService: RecommendService) {}

  @Get()
  async getRecommend(@User() user): Promise<ResponseRecommendDto> {
    return await this.recomService.getRecommend(user);
  }

  @Get('essential')
  async getEssentialRecommend(
    @User() user,
  ): Promise<ResponseEssentialRecommendDto> {
    return await this.recomService.getEssentialRecommend(user);
  }
}
