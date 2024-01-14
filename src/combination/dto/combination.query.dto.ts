import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CombQueryRawDto {
  @Expose()
  private combName: string;

  @Expose()
  private serial: string;

  @Expose()
  private rmaName: string;

  @Expose()
  private isDefault: boolean;

  @Expose()
  private lastUpdatedAt: Date;

  @Expose()
  private imgUrl: string;

  getImgUrl() {
    return this.imgUrl;
  }

  getLastUpdatedAt() {
    return this.lastUpdatedAt;
  }

  getIsDefault() {
    return this.isDefault;
  }

  getCombName() {
    return this.combName;
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
