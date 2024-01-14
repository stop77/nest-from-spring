export class ProductInfoDto {
  constructor(
    manufac: string,
    name: string,
    serial: string,
    img: string,
    price: number,
    rmaList: string[],
    funcList: string[],
    alertList: string[],
    sideEffectList: string[],
  ) {
    this.manufacturer = manufac;
    this.name = name;
    this.serial = serial;
    this.imgUrl = img;
    this.price = price;
    this.rmaList = rmaList;
    this.funcList = funcList;
    this.alertList = alertList;
    this.sideEffectList = sideEffectList;
  }
  manufacturer: string;
  name: string;
  serial: string;
  imgUrl: string;
  price: number;
  rmaList: string[];
  funcList: string[];
  alertList: string[];
  sideEffectList: string[];
}
