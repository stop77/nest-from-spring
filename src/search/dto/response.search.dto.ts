import { PageInfo } from './page.info';
import { ProductInfoDto } from './response.product-info.dto';

export class ResponseSearchDto {
  constructor(pageInfo: PageInfo, productInfoList: ProductInfoDto[]) {
    this.pageInfo = pageInfo;
    this.productInfoList = productInfoList;
  }
  pageInfo: PageInfo;
  productInfoList: ProductInfoDto[];
}
