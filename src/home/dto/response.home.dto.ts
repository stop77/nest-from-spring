import { ApiProperty } from '@nestjs/swagger';

export class ResponseHomeDto {
  @ApiProperty({ example: 730, description: '내 현재 영양 점수' })
  private myScore: number;

  @ApiProperty({ example: 1300, description: '도달 가능한 최고의 영양 점수' })
  private totalScore: number;

  constructor(myScore: number, totalScore: number) {
    this.myScore = myScore;
    this.totalScore = totalScore;
  }
}
