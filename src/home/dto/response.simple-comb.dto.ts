import { ApiProperty } from '@nestjs/swagger';

export class ResponseSimpleCombDto {
  @ApiProperty({ example: '기본 조합', description: '조합 이름' })
  private combName: string;

  @ApiProperty({
    example: ['2012314', '43211'],
    description: '조합에 있는 제품들의 시리얼 배열',
  })
  private combSerialList: string[];

  constructor(combName: string, combSerialList: string[]) {
    this.combName = combName;
    this.combSerialList = combSerialList;
  }
}
