import { ApiProperty } from '@nestjs/swagger';
import { IsDate, MaxLength } from 'class-validator';

export class RequestJoinDto {
  @ApiProperty({
    example: 'hbjg0711',
    description: '유저가 사용하는 유저ID. 유니크한 값으로 DB에 저장된다.',
  })
  @MaxLength(15)
  uniqId: string;

  @ApiProperty({ example: '1234', description: '비밀번호' })
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'hbjg', description: '닉네임' })
  @MaxLength(15)
  nick: string;

  @ApiProperty({ example: 'M', description: '성별. M이나 F로 구분한다.' })
  @MaxLength(1)
  sex: string;

  @ApiProperty({ example: '1991-07-11', description: '생년월일' })
  @IsDate()
  birth: Date;
}
