export class ResponseCombinationDto {
  private combName: string;
  private imgUrl: string;
  private isDefault: boolean;
  private rmaList: string[];
  private serialList: string[];
  private lastUpdatedAt: Date;

  addToRmaList(value: string) {
    this.rmaList.push(value);
  }
  addToSerialList(value: string) {
    this.serialList.push(value);
  }

  constructor(
    combName: string,
    imgUrl: string,
    isDefault: boolean,
    lastUpdatedAt: Date,
  ) {
    this.combName = combName;
    this.imgUrl = imgUrl;
    this.isDefault = isDefault;
    this.rmaList = [];
    this.serialList = [];
    this.lastUpdatedAt = lastUpdatedAt;
  }
}
