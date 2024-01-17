import { ApiProperty } from '@nestjs/swagger';

export class RequestChangeCombNameDto {
  @ApiProperty({
    example: '기본조합',
    description: '변경할 기존 조합의 이름',
  })
  before: string;

  @ApiProperty({
    example: '목표조합',
    description: '목표로 하는 조합의 이름',
  })
  after: string;
}
