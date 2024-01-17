import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CombQueryRawDto {
  @Expose()
  private id: string;

  @Expose()
  private isDefault: boolean;

  @Expose()
  private lastUpdatedAt: Date;

  @Expose()
  private name: string;

  @Expose()
  private imgUrl: string;

  @Expose()
  private serial: string;

  @Expose()
  private rmaName: string;

  getCombName() {
    return this.name;
  }
  getLastUpdatedAt() {
    return this.lastUpdatedAt;
  }
  getImgUrl() {
    return this.imgUrl;
  }

  getIsDefault() {
    return this.isDefault;
  }
  getSerial() {
    return this.serial;
  }

  getRmaName() {
    return this.rmaName;
  }
}

export class CombQueryDto {
  combName: string;
  imgUrl: string;
  isDefault: boolean;
  lastUpdatedAt: Date;
  serialList: Set<string>;
  rmaNameList: Set<string>;

  constructor(
    combName: string,
    imgUrl: string,
    isDefault: boolean,
    lastUpdatedAt: Date,
  ) {
    this.combName = combName;
    this.imgUrl = imgUrl;
    this.isDefault = isDefault;
    this.lastUpdatedAt = lastUpdatedAt;
    this.serialList = new Set<string>();
    this.rmaNameList = new Set<string>();
  }
}
