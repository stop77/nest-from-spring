import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class RmaDifferenceDto {
  constructor(
    rmaName: string,
    diff: number,
    originVol: number,
    limit: number,
    unit: string,
  ) {
    this.rmaName = rmaName;
    this.difference = diff;
    this.originalVol = originVol;
    this.limit = limit;
    this.unit = unit;
  }
  @ApiProperty({ example: '비타민c', description: 'rma 이름' })
  rmaName: string;

  @ApiProperty({ example: 20, description: 'rma 용량의 변동량' })
  difference: number;

  @ApiProperty({ example: 35, description: '기존 rma 용량' })
  originalVol: number;

  @ApiProperty({ example: 400, description: '해당 rma 허용 최대치' })
  limit: number;

  @ApiProperty({ example: 'ug', description: '해당 rma 용량 단위' })
  unit: string;
}

export class ResponseCompareDto {
  constructor(
    nudiff: number,
    exdiff: number,
    orinu: number,
    oriex: number,
    rmaDiffList: RmaDifferenceDto[],
  ) {
    this.nutritionScoreDiff = nudiff;
    this.totalExpensesDiff = exdiff;
    this.originalNutritionScore = orinu;
    this.originalTotalExpenses = oriex;
    this.rmaDiffList = rmaDiffList;
  }

  @ApiProperty({ example: 110, description: '제품 추가 시 영양점수 상승량' })
  nutritionScoreDiff: number;

  @ApiProperty({ example: 8000, description: '제품 추가 시 비용 상승량' })
  totalExpensesDiff: number;

  @IsNumber()
  @ApiProperty({ example: 700, description: '기존 조합의 영양점수' })
  originalNutritionScore: number;

  @ApiProperty({ example: 21000, description: '기존 조합의 비용' })
  originalTotalExpenses: number;

  @ApiProperty({ description: '제품 추가 시 rma들의 상승량(배열)' })
  rmaDiffList: RmaDifferenceDto[];
}
