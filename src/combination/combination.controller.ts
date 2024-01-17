import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CombinationService } from './combination.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseCombinationDto } from './dto/response.combination.dto';
import { RequestCreateCombDto } from './dto/request.create.combination.dto';
import { RequestChangeCombNameDto } from './dto/request.change.combination.dto';
import { RequestProductHandlingDto } from './dto/request.product-handling.dto';
import { RequestCompareDto } from './dto/request.compare.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';

@UseGuards(LoggedInGuard)
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

  @Post('create')
  async createCombination(@User() user, @Body() dto: RequestCreateCombDto) {
    await this.combService.createCombination(user, dto.combName, dto.imgUrl);
  }

  @Post('delete/:combName')
  async deleteCombination(@User() user, @Param('combName') combName: string) {
    await this.combService.deleteCombination(user, combName);
  }

  @Post('change')
  async changeCombName(@User() user, @Body() dto: RequestChangeCombNameDto) {
    await this.combService.changeCombinationName(user, dto.before, dto.after);
  }

  @Post('addProduct')
  async addProductIntoComb(
    @User() user,
    @Body() dto: RequestProductHandlingDto,
  ) {
    await this.combService.addProductIntoCombination(
      user,
      dto.combName,
      dto.serial,
    );
  }

  @Post('removeProduct')
  async removeProductFromComb(
    @User() user,
    @Body() dto: RequestProductHandlingDto,
  ) {
    await this.combService.removeProductFromCombination(
      user,
      dto.combName,
      dto.serial,
    );
  }

  @Post('compareNutritionScore')
  async compareNutritionScore(@User() user, dto: RequestCompareDto) {
    return await this.combService.compareNutritionScore(
      user,
      dto.adders,
      dto.reducers,
    );
  }
}
