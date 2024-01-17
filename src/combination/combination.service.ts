import { Injectable } from '@nestjs/common';
import { User } from '../entities/User';
import { ResponseCombinationDto } from './dto/response.combination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Combination } from '../entities/Combination';
import { Repository } from 'typeorm';
import { C, filter, go, map, reduce } from '../general/fx';
import { plainToInstance } from 'class-transformer';
import { CombQueryRawDto } from './dto/combination.query.dto';
import {
  InSuficientInputException,
  NotValidInputException,
  TangledDBException,
} from '../general/base.exception';
import { Transactional } from 'typeorm-transactional';
import { ProductCombination } from '../entities/ProductCombination';
import { Product } from '../entities/Product';
import {
  ResponseCompareDto,
  RmaDifferenceDto,
} from './dto/response.compare.dto';

@Injectable()
export class CombinationService {
  constructor(
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
    @InjectRepository(Product)
    private prodRepo: Repository<Product>,
    @InjectRepository(ProductCombination)
    private prodCombRepo: Repository<ProductCombination>,
  ) {}

  async getCombinations(user: User): Promise<ResponseCombinationDto[]> {
    // 중복 데이터를 가져오긴 하지만 한방 vs 중복 데이터 없이 인당 조합 수 만큼 쿼리 날리기
    // 일단 한방으로 구현.
    const queryRawList = await this.combRepo
      .createQueryBuilder('comb')
      .where('comb.user_id=:userId', { userId: user.id })
      .innerJoin('comb.productCombinations', 'prodComb')
      .innerJoin('prodComb.product', 'product')
      .innerJoin('product.productRmas', 'prodRma')
      .innerJoin('prodRma.rma', 'rma')
      .select([
        'comb.id AS id',
        'comb.defaults AS isDefault',
        'comb.last_updated_at AS lastUpdatedAt',
        'comb.name AS name',
        'comb.thumbnail AS imgUrl',
        'product.serial AS serial',
        'rma.name AS rmaName',
      ])
      .getRawMany();

    const plainedResults = plainToInstance(CombQueryRawDto, queryRawList);

    const res: Map<string, ResponseCombinationDto> = new Map();
    const rmaSet = new Set<string>();
    const serialSet = new Set<string>();

    go(
      plainedResults,
      map((a: CombQueryRawDto) => {
        const target = res.get(a.getCombName());
        if (target) {
          if (!rmaSet.has(a.getRmaName())) {
            rmaSet.add(a.getRmaName());
            target.addToRmaList(a.getRmaName());
          }
          if (!serialSet.has(a.getSerial())) {
            serialSet.add(a.getSerial());
            target.addToSerialList(a.getSerial());
          }
        } else {
          rmaSet.clear();
          serialSet.clear();
          const target = new ResponseCombinationDto(
            a.getCombName(),
            a.getImgUrl(),
            a.getIsDefault(),
            a.getLastUpdatedAt(),
          );
          res.set(a.getCombName(), target);

          rmaSet.add(a.getRmaName());
          target.addToRmaList(a.getRmaName());
          serialSet.add(a.getSerial());
          target.addToSerialList(a.getSerial());
        }
      }),
    );

    return go(
      res,
      map((a) => a[1]), // JS Map 구조 상 [0]이 키, [1]이 값으로, 값만 빼오려면 a[1]을 리턴.
    );
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

    const newComb = Combination.create(user, combName, imgUrl);
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

  async changeCombinationName(user: User, before: string, after: string) {
    const targetBefore = await this.combRepo.findOne({
      where: { userId: user.id, name: before },
    });
    if (!targetBefore)
      throw new NotValidInputException('해당 이름을 가진 조합이 없습니다.');

    const targetAfter = await this.combRepo.findOne({
      where: { userId: user.id, name: after },
    });
    if (targetAfter)
      throw new NotValidInputException(
        '변경하고자 하는 이름을 가진 조합이 이미 존재합니다.',
      );

    await this.combRepo.update(targetBefore.id, { name: after });
  }

  async addProductIntoCombination(
    user: User,
    combName: string,
    serial: string,
  ) {
    const targetComb = await this.combRepo.findOne({
      where: { userId: user.id, name: combName },
    });
    if (!targetComb)
      throw new NotValidInputException('해당 이름을 가진 조합이 없습니다.');

    let count = await this.combRepo
      .createQueryBuilder('combination')
      .innerJoin('combination.productCombinations', 'prodCombs')
      .innerJoin('prodCombs.product', 'product', 'product.serial = :serial', {
        serial,
      })
      .where('combination.id=:combId', { combId: targetComb.id })
      .getCount();

    if (count >= 1)
      throw new NotValidInputException(
        '해당 조합에 이미 해당 제품이 존재합니다.',
      );
    else if (count === 0) {
      const targetProduct = await this.prodRepo.findOne({ where: { serial } });
      const res = new ProductCombination();
      res.combinationId = targetComb.id;
      res.productId = targetProduct.id;

      await this.prodCombRepo.save(res);
    } else throw new TangledDBException('관리자에게 문의해주세요.');
  }

  async removeProductFromCombination(
    user: User,
    combName: string,
    serial: string,
  ) {
    const targetComb = await this.combRepo.findOne({
      where: { userId: user.id, name: combName },
    });
    if (!targetComb)
      throw new NotValidInputException('해당 이름을 가진 조합이 없습니다.');

    const targetProdComb = await this.prodCombRepo
      .createQueryBuilder('productCombinations')
      .innerJoin(
        'productCombinations.product',
        'product',
        'product.serial = :serial',
        {
          serial,
        },
      )
      .where('productCombinations.combinationId=:combId', {
        combId: targetComb.id,
      })
      .getOne();

    if (!targetProdComb)
      throw new NotValidInputException('해당 조합에 해당 제품이 없습니다.');
    await this.prodCombRepo.delete(targetProdComb);
  }

  async compareNutritionScore(
    user: User,
    adders: string[],
    reducers: string[],
  ): Promise<ResponseCompareDto> {
    // 비즈니스 코드로 비공개 처리. Response 견본을 리턴.
    const feeder: RmaDifferenceDto[] = [];
    feeder.push(new RmaDifferenceDto('비타민C', 20, 17, 200, 'ug'));
    feeder.push(new RmaDifferenceDto('비타민E', 20, 17, 200, 'ug'));
    feeder.push(new RmaDifferenceDto('마그네슘', 20, 17, 200, 'ug'));
    feeder.push(new RmaDifferenceDto('비타민A', 20, 17, 200, 'ug'));
    const res = new ResponseCompareDto(120, 8000, 800, 12000, feeder);
    return res;
  }
}
