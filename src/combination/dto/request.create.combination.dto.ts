import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestCreateCombDto {
  @ApiProperty({ example: '기본조합', description: '조합 이름' })
  @IsString()
  combName: string;

  @IsString()
  @ApiProperty({
    example: 'http://localhost:3030/uploads/hbjg0711/img.jpg',
    description: '이미지 주소',
  })
  imgUrl: string;
}
