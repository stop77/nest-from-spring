import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { ResponseCombinationDto } from './dto/response.combination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';
import { Repository } from 'typeorm';
import { filter, go, map } from '../general/fx';
import { plainToInstance } from 'class-transformer';
import { CombQueryRawDto, CombQueryDto } from './dto/combination.query.dto';
import {
  InSuficientInputException,
  NotValidInputException,
  TangledDBException,
} from '../general/base.exception';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class CombinationService {
  constructor(
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
  ) {}
  async getCombinations(user: User): Promise<ResponseCombinationDto[]> {
    const results = await this.combRepo
      .createQueryBuilder('combination')
      .innerJoin(
        'combination.productCombinations',
        'prodCombs',
        'combination.userId=:userId',
        { userId: user.id },
      )
      .innerJoin('prodCombs.product', 'product')
      .innerJoin('product.productRmas', 'prodRma')
      .innerJoin('prodRma.rma', 'rma')
      .select('combination.name', 'combName')
      .addSelect('combination.defaults', 'isDefault')
      .addSelect('combination.lastUpdatedAt', 'lastUpdatedAt')
      .addSelect('combination.thumbnail', 'imgUrl')
      .addSelect('product.serial', 'serial')
      .addSelect('rma.name', 'rmaName')
      .getRawMany();

    const resBefore: CombQueryRawDto[] = plainToInstance(
      CombQueryRawDto,
      results,
    );

    return this.getResponseFromQueryDto(resBefore);
  }

  @Transactional()
  async createCombination(
    user: User,
    combName: string,
    imgUrl: string,
  ): Promise<void> {
    if (
      await this.combRepo.findOne({
        where: { userId: user.id, name: combName },
      })
    )
      throw new NotValidInputException('해당 조합 이름을 이미 사용중 입니다.');

    const newComb = new Combination();
    newComb.defaults = false;
    newComb.name = combName;
    newComb.userId = user.id;
    newComb.thumbnail = imgUrl;

    await this.combRepo.save(newComb);
  }

  @Transactional()
  async changeDefaultCombination(user: User, combName: string): Promise<void> {
    const combList: Combination[] = await this.combRepo.find({
      where: { userId: user.id },
    });
    if (!combList || combList.length == 0)
      throw new InSuficientInputException(
        '해당 유저는 조합을 가지고 있지 않습니다.',
      );

    const currDefaultList: Combination[] = go(
      combList,
      filter((o: Combination) => o.defaults),
    );

    if (currDefaultList.length !== 1)
      throw new TangledDBException('관리자에게 문의해 주세요.');

    const currDefault = currDefaultList[0];

    const targetDefault = combList.find((o) => o.name === combName);
    if (!targetDefault)
      throw new NotValidInputException(
        '해당 이름을 가진 조합이 존재하지 않습니다.',
      );

    await Promise.all([
      this.combRepo.update({ id: currDefault.id }, { defaults: false }),
      this.combRepo.update({ id: targetDefault.id }, { defaults: true }),
    ]);
  }

  @Transactional()
  async deleteCombination(user: User, combName: string): Promise<void> {
    const combList: Combination[] = await this.combRepo.find({
      where: { userId: user.id },
    });
    if (!combList || combList.length == 0)
      throw new InSuficientInputException(
        '해당 유저는 조합을 가지고 있지 않습니다.',
      );

    const targetComb = combList.find((o) => o.name === combName);
    if (!targetComb)
      throw new NotValidInputException(
        '해당 이름을 가진 조합이 존재하지 않습니다.',
      );

    if (targetComb.defaults)
      throw new NotValidInputException('기본 조합을 삭제할 수는 없습니다.');

    await this.combRepo.delete(targetComb);
  }

  private getResponseFromQueryDto(
    before: CombQueryRawDto[],
  ): ResponseCombinationDto[] {
    const resMap = new Map<string, CombQueryDto>();
    go(
      before,
      map((a: CombQueryRawDto) => {
        let target: CombQueryDto = resMap.get(a.getCombName());
        if (target) {
          target.rmaNameList.add(a.getRmaName());
          target.serialList.add(a.getSerial());

          resMap.set(a.getCombName(), target);
        } else {
          target = new CombQueryDto(
            a.getCombName(),
            a.getImgUrl(),
            a.getIsDefault(),
            a.getLastUpdatedAt(),
          );
          target.rmaNameList.add(a.getRmaName());
          target.serialList.add(a.getSerial());

          resMap.set(a.getCombName(), target);
        }
      }),
    );

    const res: ResponseCombinationDto[] = go(
      resMap.values(),
      map(
        (a: CombQueryDto) =>
          new ResponseCombinationDto(
            a.combName,
            a.imgUrl,
            a.isDefault,
            [...a.rmaNameList],
            [...a.serialList],
            a.lastUpdatedAt,
          ),
      ),
    );

    return res;
  }
}
