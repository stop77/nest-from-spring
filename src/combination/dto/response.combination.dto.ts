export class ResponseCombinationDto {
  private combName: string;
  private imgUrl: string;
  private isDefault: boolean;
  private rmaList: string[];
  private serialList: string[];
  private lastUpdatedAt: Date;

  constructor(
    combName: string,
    imgUrl: string,
    isDefault: boolean,
    rmaList: string[],
    serialList: string[],
    lastUpdatedAt: Date,
  ) {
    this.combName = combName;
    this.imgUrl = imgUrl;
    this.isDefault = isDefault;
    this.rmaList = rmaList;
    this.serialList = serialList;
    this.lastUpdatedAt = lastUpdatedAt;
  }
}
