import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RequestAddProductDto {
  @ApiProperty({ example: '식약처', description: '제품 정보 출처' })
  @IsString()
  gubun: string;

  @ApiProperty({
    example: 'http://localhost:3030/uploads/hbjg0711/2135213.jpg',
    description: '제품 이미지 주소',
  })
  @IsString()
  image: string;

  @ApiProperty({ example: '종근당', description: '생산 회사 이름' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ example: '아이허브 비타민', description: '제품 이름' })
  @IsString()
  name: string;

  @ApiProperty({ example: '20314512', description: '제품 시리얼' })
  @IsString()
  serial: string;

  @ApiProperty({ example: 11000, description: '제품 가격' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: ['비타민e', '비타민c', '아연'],
    description: '제품 rma 배열',
  })
  @IsString({ each: true })
  rmaList: string[];

  @ApiProperty({
    example: ['간', '눈', '관절'],
    description: '제품 기능성 태그 배열',
  })
  @IsString({ each: true })
  funcList: string[];

  @ApiProperty({
    example: ['홍조', '두근거림'],
    description: '제품 부작용 태그 배열',
  })
  @IsString({ each: true })
  seList: string[];

  @ApiProperty({
    example: ['심장', '신장'],
    description: '제품 섭취 주의자 태그 배열',
  })
  @IsString({ each: true })
  alertList: string[];
}
