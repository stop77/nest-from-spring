import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { ResponseHomeDto } from './dto/response.home.dto';
import { CalcTarget } from '../entities/CalcTarget';
import { InSuficientInputException } from '../general/base.exception';
import { Product } from '../entities/Product';
import { Health } from '../entities/Health';
import { UserAddition } from '../entities/UserAddition';
import { getNow } from '../general/format.date';
import { ProductService } from '../product/product.service';
import { ResponseSimpleCombDto } from './dto/response.simple-comb.dto';
import { Combination } from '../entities/Combination';
import { C, go } from '../general/fx';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Health)
    private healthRepo: Repository<Health>,
    @InjectRepository(UserAddition)
    private additionRepo: Repository<UserAddition>,
    @InjectRepository(CalcTarget)
    private calcTargetRepo: Repository<CalcTarget>,
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
    private prodService: ProductService,
  ) {}

  async getHome(user: User): Promise<ResponseHomeDto> {
    if (!user.diagnose)
      throw new InSuficientInputException(
        '자가진단이 완료되어야 홈 화면을 불러올 수 있습니다.',
      );

    const [targetHealth, targetAddition] = await Promise.all([
      this.healthRepo.findOne({
        where: { id: user.healthId },
      }),
      this.additionRepo.findOne({ where: { id: user.userAdditionId } }),
    ]);
    user.health = targetHealth;
    user.userAddition = targetAddition;

    const userType: CalcTarget = await this.getUserType(user);
    const productList: Product[] =
      await this.prodService.getDefaultProductList(user);

    const [myScore, totalScore] = this.getScoreAndMaxScore(
      userType,
      productList,
    );

    return new ResponseHomeDto(myScore, totalScore);
  }

  async getSimpleCombList(user: User): Promise<ResponseSimpleCombDto[]> {
    let combList: Combination[] = await this.combRepo.find({
      where: { userId: user.id },
    });

    let res: ResponseSimpleCombDto[] = await go(
      combList,
      C.map(this.createSimpleCombDtoFromComb),
    );

    return res;
  }

  private async createSimpleCombDtoFromComb(
    comb: Combination,
  ): Promise<ResponseSimpleCombDto> {
    let combSerialList: string[] = await this.combRepo
      .createQueryBuilder('combination')
      .innerJoin(
        'combination.productCombinations',
        'prodComb',
        'prodComb.combination_id=:combId',
        { combId: comb.id },
      )
      .innerJoin('prodComb.product', 'product')
      .select('product.serial', 'serial')
      .getRawMany();

    let result: ResponseSimpleCombDto = { combName: comb.name, combSerialList };

    return result;
  }

  private async getUserType(user: User): Promise<CalcTarget> {
    const sex: string = user.health.sex;
    const birth: Date = user.userAddition.birth;
    const pregnant: boolean = user.health.pregnant;
    const lactate: boolean = user.health.lactate;

    if (!sex)
      throw new InSuficientInputException(
        '성별 정보가 없습니다. 자가진단을 통해 정보를 입력해 주세요.',
      );
    if (!birth)
      throw new InSuficientInputException(
        '생일 정보가 없습니다. 자가진단을 통해 정보를 입력해 주세요.',
      );
    if (!pregnant)
      throw new InSuficientInputException(
        '임신 여부 정보가 없습니다. 자가진단을 통해 정보를 입력해 주세요.',
      );
    if (!lactate)
      throw new InSuficientInputException(
        '수유 여부 정보가 없습니다. 자가진단을 통해 정보를 입력해 주세요.',
      );

    return await this.getCalcTarget(
      sex,
      birth.getFullYear(),
      birth.getMonth(),
      pregnant,
      lactate,
    );
  }

  private async getCalcTarget(
    sex: string,
    year: number,
    month: number,
    pregnant: boolean,
    lactate: boolean,
  ): Promise<CalcTarget> {
    let res: CalcTarget = null;
    const targetList: CalcTarget[] = [];
    let category = '';
    const age: number = getNow().getFullYear() - year + 1;

    if (age <= 1) {
      const monthsDiff = this.getMonthsDifference(year, month);
      if (monthsDiff <= 12) {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '영아' },
          })),
        );
        category = '영아';
      } else {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '유아' },
          })),
        );
        category = '유아';
      }
    } else if (age < 6) {
      targetList.push(
        ...(await this.calcTargetRepo.find({
          where: { mainCategory: '유아' },
        })),
      );
      category = '유아';
    } else {
      if (pregnant) {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '임산부' },
          })),
        );
        category = '임산부';
      } else if (!pregnant && lactate) {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '수유부' },
          })),
        );
        category = '수유부';
      } else if (sex === 'M') {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '남성' },
          })),
        );
        category = '남성';
      } else if (sex === 'W') {
        targetList.push(
          ...(await this.calcTargetRepo.find({
            where: { mainCategory: '여성' },
          })),
        );
        category = '여성';
      }
    }

    let targetStartAge = 0;
    if (category != '유아') {
      for (let i = 0; i < targetList.length; i++) {
        let tmpStartAge = targetList[i].startAge;
        if (age >= tmpStartAge) targetStartAge = tmpStartAge;
        else break;
      }
    } else {
      const monthsDiff = this.getMonthsDifference(year, month);
      if (monthsDiff >= 6) targetStartAge = 6;
    }

    for (let i = 0; i < targetList.length; i++) {
      if (targetStartAge === targetList[i].startAge) {
        res = targetList[i];
        break;
      }
    }

    if (!res)
      throw new InSuficientInputException(
        '해당 유저의 성별이나 생년월일이 잘못 되었습니다. 다시 한 번 확인해 주세요.',
      );

    return res;
  }

  private getMonthsDifference(beforeYear: number, beforeMonth: number): number {
    const month1 = beforeYear * 12 + beforeMonth;
    const month2 = getNow().getFullYear() * 12 + getNow().getMonth();

    return month2 - month1;
  }

  private getScoreAndMaxScore(
    userType: CalcTarget,
    productList: Product[],
  ): number[] {
    // 비즈니스 핵심 코드로 비공개. 따라서 항상 [0, 0]을 리턴하도록 설정.
    const num1 = 0;
    const num2 = 0;

    return [num1, num2];
  }
}
