import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class RequestLoginDto {
  constructor() {
    this.uniqId = '';
    this.password = '';
  }

  @ApiProperty({ example: 'hbjg0711', description: '사용자 ID' })
  @MaxLength(15)
  uniqId: string;

  @ApiProperty({ example: '1234', description: '비밀번호' })
  @MaxLength(20)
  password: string;
}
