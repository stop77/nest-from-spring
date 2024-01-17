import { ApiProperty } from '@nestjs/swagger';

export class RequestCompareDto {
  @ApiProperty({ example: '기본조합', description: '조합 이름' })
  combName: string;

  @ApiProperty({
    example: ['201421', '3321345'],
    description: '조합에 추가할 제품의 시리얼 배열',
  })
  adders: string[];

  @ApiProperty({
    example: ['201421', '3321345'],
    description: '조합에서 제거할 제품의 시리얼 배열',
  })
  reducers: string[];
}
