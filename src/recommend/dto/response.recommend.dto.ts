export class EssentialDiffElem {
  constructor(rmaName: string, before: number, after: number) {
    this.rmaName = rmaName;
    this.before = before;
    this.after = after;
  }

  rmaName: string;
  before: number;
  after: number;
}

export class CombElemDto {
  constructor(combName: string, imgUrl: string, isDefault: boolean) {
    this.combName = combName;
    this.imgUrl = imgUrl;
    this.isDefault = isDefault;
  }

  combName: string;
  imgUrl: string;
  isDefault: boolean;
}

export class ResponseRecommendDto {
  constructor(
    isCached: boolean,
    additionalScore: number,
    additionalPrice: number,
    nutritionScoreList: EssentialDiffElem[],
    combList: CombElemDto[],
  ) {
    this.isCached = isCached;
    this.additionalScore = additionalScore;
    this.additionalPrice = additionalPrice;
    this.nutritionScoreList = nutritionScoreList;
    this.combList = combList;
  }
  isCached: boolean;
  additionalScore: number;
  additionalPrice: number;
  nutritionScoreList: EssentialDiffElem[];
  combList: CombElemDto[];
}
