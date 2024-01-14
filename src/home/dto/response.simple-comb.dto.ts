export class ResponseSimpleCombDto {
  combName: string;
  combSerialList: string[];

  constructor(combName: string, combSerialList: string[]) {
    this.combName = combName;
    this.combSerialList = combSerialList;
  }
}
