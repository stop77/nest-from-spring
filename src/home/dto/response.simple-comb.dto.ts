export class ResponseSimpleCombDto {
  private combName: string;
  private combSerialList: string[];

  constructor(combName: string, combSerialList: string[]) {
    this.combName = combName;
    this.combSerialList = combSerialList;
  }
}
