export class RmaDifferenceDto {
  constructor(
    rmaName: string,
    diff: number,
    originVol: number,
    limit: number,
    unit: string,
  ) {
    this.rmaName = rmaName;
    this.difference = diff;
    this.originalVol = originVol;
    this.limit = limit;
    this.unit = unit;
  }
  rmaName: string;
  difference: number;
  originalVol: number;
  limit: number;
  unit: string;
}

export class ResponseCompareDto {
  constructor(
    nudiff: number,
    exdiff: number,
    orinu: number,
    oriex: number,
    rmaDiffList: RmaDifferenceDto[],
  ) {
    this.nutritionScoreDiff = nudiff;
    this.totalExpensesDiff = exdiff;
    this.originalNutritionScore = orinu;
    this.originalTotalExpenses = oriex;
    this.rmaDiffList = rmaDiffList;
  }

  nutritionScoreDiff: number;
  totalExpensesDiff: number;
  originalNutritionScore: number;
  originalTotalExpenses: number;
  rmaDiffList: RmaDifferenceDto[];
}
