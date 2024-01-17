import { ApiProperty } from '@nestjs/swagger';

export class ResponseCombinationDto {
  @ApiProperty({ example: '기본조합', description: '조합 이름' })
  private combName: string;

  @ApiProperty({
    example: 'http://localhost:3030/uploads/hbjg0711/img.jpg',
    description: '이미지 주소',
  })
  private imgUrl: string;

  @ApiProperty({ example: true, description: '기본 조합 여부' })
  private isDefault: boolean;

  @ApiProperty({ example: ['비타민c', '비타민e'], description: 'rma 배열' })
  private rmaList: string[];

  @ApiProperty({
    example: ['2022331', '3011123'],
    description: '제품 시리얼 배열',
  })
  private serialList: string[];

  @ApiProperty({ example: '20240117T09:03:00', description: '수정된 날짜' })
  private lastUpdatedAt: Date;

  addToRmaList(value: string) {
    this.rmaList.push(value);
  }
  addToSerialList(value: string) {
    this.serialList.push(value);
  }

  constructor(
    combName: string,
    imgUrl: string,
    isDefault: boolean,
    lastUpdatedAt: Date,
  ) {
    this.combName = combName;
    this.imgUrl = imgUrl;
    this.isDefault = isDefault;
    this.rmaList = [];
    this.serialList = [];
    this.lastUpdatedAt = lastUpdatedAt;
  }
}
