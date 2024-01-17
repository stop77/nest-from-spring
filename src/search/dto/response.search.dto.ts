import { ApiProperty } from '@nestjs/swagger';
import { PageInfo } from './page.info';
import { ProductInfoDto } from './response.product-info.dto';

export class ResponseSearchDto {
  constructor(pageInfo: PageInfo, productInfoList: ProductInfoDto[]) {
    this.pageInfo = pageInfo;
    this.productInfoList = productInfoList;
  }
  @ApiProperty({ description: '페이지 정보' })
  pageInfo: PageInfo;

  @ApiProperty({ type: [ProductInfoDto], description: '제품 정보 리스트' })
  productInfoList: ProductInfoDto[];
}
