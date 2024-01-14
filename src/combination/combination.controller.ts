import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CombinationService } from './combination.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseCombinationDto } from './dto/response.combination.dto';
import { RequestCreateCombDto } from './dto/request.create.combination.dto';

@Controller('combination')
export class CombinationController {
  constructor(private readonly combService: CombinationService) {}

  @Get()
  async getMyCombinations(@User() user): Promise<ResponseCombinationDto[]> {
    return await this.combService.getCombinations(user);
  }

  @Post('changeDefault/:combName')
  async changeDefaultCombination(
    @User() user,
    @Param('combName') combName: string,
  ) {
    await this.combService.changeDefaultCombination(user, combName);
  }

  @Post('create/:combName')
  async createCombination(@User() user, @Body() dto: RequestCreateCombDto) {
    await this.combService.createCombination(user, dto.combName, dto.imgUrl);
  }

  @Post('delete/:combName')
  async deleteCombination(@User() user, @Param('combName') combName: string) {
    await this.combService.deleteCombination(user, combName);
  }
}
