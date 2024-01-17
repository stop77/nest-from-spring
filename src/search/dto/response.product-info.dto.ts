import { ApiProperty } from '@nestjs/swagger';

export class ProductInfoDto {
  constructor(
    manufac: string,
    name: string,
    serial: string,
    img: string,
    price: number,
    rmaList: string[],
    funcList: string[],
    alertList: string[],
    sideEffectList: string[],
  ) {
    this.manufacturer = manufac;
    this.name = name;
    this.serial = serial;
    this.imgUrl = img;
    this.price = price;
    this.rmaList = rmaList;
    this.funcList = funcList;
    this.alertList = alertList;
    this.sideEffectList = sideEffectList;
  }
  @ApiProperty({ example: '종근당', description: '제품 생산 회사' })
  manufacturer: string;
  @ApiProperty({ example: '아이허브 비타민', description: '제품 이름' })
  name: string;

  @ApiProperty({ example: '120315123', description: '제품 시리얼' })
  serial: string;

  @ApiProperty({
    example: 'http://localhost:3030/uploads/hbjg0711/imgurl.jpg',
    description: '제품 이미지 주소',
  })
  imgUrl: string;

  @ApiProperty({ example: 12000, description: '제품 가격' })
  price: number;

  @ApiProperty({
    example: ['비타민e', '비타민c', '아연'],
    description: '제품 rma 배열',
  })
  rmaList: string[];

  @ApiProperty({
    example: ['간', '눈', '관절'],
    description: '제품 기능성 태그 배열',
  })
  funcList: string[];

  @ApiProperty({
    example: ['심장', '신장'],
    description: '제품 섭취 주의자 태그 배열',
  })
  alertList: string[];

  @ApiProperty({
    example: ['홍조', '두근거림'],
    description: '제품 부작용 태그 배열',
  })
  sideEffectList: string[];
}
