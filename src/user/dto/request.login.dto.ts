import { MaxLength } from 'class-validator';

export class RequestLoginDto {
  @MaxLength(15)
  uniqId: string;

  @MaxLength(20)
  password: string;
}
