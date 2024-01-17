import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CombinationService } from './combination.service';
import { User } from '../general/decorator/user.decorator';
import { ResponseCombinationDto } from './dto/response.combination.dto';
import { RequestCreateCombDto } from './dto/request.create.combination.dto';
import { RequestChangeCombNameDto } from './dto/request.change.combination.dto';
import { RequestProductHandlingDto } from './dto/request.product-handling.dto';
import { RequestCompareDto } from './dto/request.compare.dto';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiOkReponseNull,
  ApiOkResponseWrapped,
  ApiOkResponseWrappedArray,
  NullData,
} from '../general/api.response.dto';
import { ExceptionPackage } from '../general/exception.filter';
import { ResponseCompareDto } from './dto/response.compare.dto';

@ApiTags('COMBINATION')
@UseGuards(LoggedInGuard)
@Controller('combination')
@ApiResponse({
  status: 401,
  type: ExceptionPackage,
  description: '접근 권한이 없습니다.',
})
export class CombinationController {
  constructor(private readonly combService: CombinationService) {}

  @Get()
  @ApiOperation({ summary: '조합 화면 데이터 제공' })
  @ApiOkResponseWrappedArray(ResponseCombinationDto)
  async getMyCombinations(@User() user): Promise<ResponseCombinationDto[]> {
    return await this.combService.getCombinations(user);
  }

  @Post('changeDefault/:combName')
  @ApiOperation({ summary: 'combName을 가진 조합을 기본 조합으로 변경' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '올바르지 않은 combName입니다.',
  })
  async changeDefaultCombination(
    @User() user,
    @Param('combName') combName: string,
  ) {
    await this.combService.changeDefaultCombination(user, combName);
  }

  @Post('create')
  @ApiOperation({ summary: '조합 생성' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 combName이 이미 존재합니다.',
  })
  async createCombination(@User() user, @Body() dto: RequestCreateCombDto) {
    await this.combService.createCombination(user, dto.combName, dto.imgUrl);
  }

  @Post('delete/:combName')
  @ApiOperation({ summary: '조합 제거' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '조합을 하나도 가지고 있지 않습니다.',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '올바르지 않은 combName 입니다.',
  })
  async deleteCombination(@User() user, @Param('combName') combName: string) {
    await this.combService.deleteCombination(user, combName);
  }

  @Post('change')
  @ApiOperation({ summary: '조합 이름 변경' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '올바르지 않은 combName입니다.',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 combName이 이미 존재합니다.',
  })
  async changeCombName(@User() user, @Body() dto: RequestChangeCombNameDto) {
    await this.combService.changeCombinationName(user, dto.before, dto.after);
  }

  @Post('addProduct')
  @ApiOperation({ summary: '조합에 제품 넣기' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '올바르지 않은 combName입니다.',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 제품이 이미 조합 내에 존재합니다.',
  })
  @ApiResponse({
    status: 500,
    type: ExceptionPackage,
    description: 'DB 문제입니다. 문의해 주세요.',
  })
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
  @ApiOperation({ summary: '조합에서 제품 제거' })
  @ApiOkReponseNull()
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '올바르지 않은 combName입니다.',
  })
  @ApiResponse({
    status: 400,
    type: ExceptionPackage,
    description: '해당 제품이 조합 내에 존재하지 않습니다.',
  })
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
  @ApiOperation({
    summary:
      '조합에 특정 상품들을 넣고, 특정 상품들을 뺏을 때의 영양점수 차이를 확인하기',
  })
  @ApiOkResponseWrapped(ResponseCompareDto)
  async compareNutritionScore(
    @User() user,
    @Body() dto: RequestCompareDto,
  ): Promise<ResponseCompareDto> {
    return await this.combService.compareNutritionScore(
      user,
      dto.adders,
      dto.reducers,
    );
  }
}
