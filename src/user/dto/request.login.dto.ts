import { MaxLength } from 'class-validator';

export class RequestLoginDto {
  constructor() {
    this.uniqId = '';
    this.password = '';
  }

  @MaxLength(15)
  uniqId: string;

  @MaxLength(20)
  password: string;
}
