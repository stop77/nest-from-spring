import { IsNumber, IsString } from 'class-validator';

export class RequestAddProductDto {
  @IsString()
  gubun: string;
  @IsString()
  image: string;
  @IsString()
  manufacturer: string;
  @IsString()
  name: string;
  @IsString()
  serial: string;
  @IsNumber()
  price: number;

  @IsString({ each: true })
  rmaList: string[];
  @IsString({ each: true })
  funcList: string[];
  @IsString({ each: true })
  seList: string[];
  @IsString({ each: true })
  alertList: string[];
}
