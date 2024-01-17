import { IsString } from 'class-validator';

export class RequestCreateCombDto {
  @IsString()
  combName: string;
  @IsString()
  imgUrl: string;
}
