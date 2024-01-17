import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestProductHandlingDto {
  @ApiProperty({ example: '기본조합', description: '조합 이름' })
  @IsString()
  combName: string;

  @IsString()
  @ApiProperty({
    example: '20133332',
    description: '제품 시리얼 값',
  })
  serial: string;
}
