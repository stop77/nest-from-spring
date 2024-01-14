export class ResponseHomeDto {
  private myScore: number;
  private totalScore: number;

  constructor(myScore: number, totalScore: number) {
    this.myScore = myScore;
    this.totalScore = totalScore;
  }
}
