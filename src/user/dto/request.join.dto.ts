import { MaxLength } from 'class-validator';

export class RequestJoinDto {
  @MaxLength(15)
  uniqId: string;

  @MaxLength(20)
  password: string;

  @MaxLength(15)
  nick: string;

  @MaxLength(1)
  sex: string;

  birth: Date;
}
