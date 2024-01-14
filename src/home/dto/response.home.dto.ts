export class ResponseHomeDto {
  myScore: number;
  totalScore: number;

  constructor(myScore: number, totalScore: number) {
    this.myScore = myScore;
    this.totalScore = totalScore;
  }
}
