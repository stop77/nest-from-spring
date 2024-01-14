import { EssentialDiffElem } from './response.recommend.dto';

export class SimpleProductDto {
  name: string;
  serial: string;
  manufacturer: string;
  imgUrl: string;
  averagePeriod: number;
  amountPerServing: number;
  volPerUnit: number;
  price: number;
}

export class ResponseEssentialRecommendDto {
  constructor(
    originalSCore: number,
    additionalScore: number,
    additionalPrice: number,
    essenDiffElemList: EssentialDiffElem[],
    recommendProdList: SimpleProductDto[],
  ) {
    this.originalScore = originalSCore;
    this.additionalPrice = additionalPrice;
    this.additionalScore = additionalScore;
    this.essenDiffElemList = essenDiffElemList;
    this.recommendedProductList = recommendProdList;
  }
  originalScore: number;
  additionalScore: number;
  additionalPrice: number;
  essenDiffElemList: EssentialDiffElem[];
  recommendedProductList: SimpleProductDto[];
}
