import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { Combination } from '../entities/Combination';
import { Transactional } from 'typeorm-transactional';
import { ProductRma } from '../entities/ProductRma';
import { ProductAlert } from '../entities/ProductAlert';
import { ProductFunc } from '../entities/ProductFunc';
import { ProductSideEffect } from '../entities/ProductSideEffect';
import { C, go, log, map } from '../general/fx';
import { HffRma } from '../entities/HffRma';
import {
  NotValidInputException,
  UnCatchedException,
} from '../general/base.exception';
import { DbExceptionEnum } from '../general/exception.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
    @InjectRepository(Product)
    private prodRepo: Repository<Product>,
    @InjectRepository(HffRma)
    private rmaRepo: Repository<HffRma>,

    @InjectRepository(ProductRma)
    private prodRmaRepo: Repository<ProductRma>,
    @InjectRepository(ProductAlert)
    private prodAlertRepo: Repository<ProductAlert>,
    @InjectRepository(ProductFunc)
    private prodFuncRepo: Repository<ProductFunc>,
    @InjectRepository(ProductSideEffect)
    private prodSeRepo: Repository<ProductSideEffect>,
  ) {}

  @Transactional()
  async addProduct(
    gubun: string,
    image: string,
    manufacturer: string,
    name: string,
    serial: string,
    price: number,
    rmaStrList: string[],
    funcList: string[],
    alertList: string[],
    seList: string[],
  ) {
    let rmaList: HffRma[];
    try {
      rmaList = await go(
        rmaStrList,
        C.map(
          async (a: string) =>
            await this.rmaRepo.findOneOrFail({ where: { name: a } }),
        ),
      );
    } catch (error) {
      throw new NotValidInputException('원료 이름을 정확히 입력해 주세요.');
    }

    let savedProduct: Product;
    try {
      savedProduct = await this.prodRepo.save(
        Product.create(gubun, image, manufacturer, name, serial, price),
      );
    } catch (err) {
      if (err.driverError.code === DbExceptionEnum.DUPLICATE_KEY) {
        throw new NotValidInputException(
          '중복된 제품 일련번호를 입력하셨습니다. 업데이트 항목을 이용해 주세요.',
        );
      } else throw new UnCatchedException();
    }

    await this.addByProduct(savedProduct, rmaList, funcList, alertList, seList);
  }

  @Transactional()
  async deleteProduct(serial: string) {
    const target = await this.prodRepo.findOne({ where: { serial } });
    if (!target)
      throw new NotValidInputException('해당 일련번호를 가진 제품이 없습니다.');
    await this.prodRepo.delete(target.id);
  }

  async getDefaultProductList(user: User): Promise<Product[]> {
    const defaultComb: Combination = await this.combRepo.findOneOrFail({
      where: { userId: user.id, defaults: true },
    });

    return await this.prodRepo
      .createQueryBuilder('product')
      .innerJoin(
        'product.productCombination',
        'prodComb',
        'prodComb.combination_id=:combId',
        { combId: defaultComb.id },
      )
      .getMany();
  }

  private async addByProduct(
    product: Product,
    rmaList: HffRma[],
    funcList: string[],
    alertList: string[],
    seList: string[],
  ) {
    const prodRmaList: ProductRma[] = go(
      rmaList,
      map((a: HffRma) => ProductRma.create(product, a)),
    );

    const prodFuncList: ProductFunc[] = go(
      funcList,
      map((a: string) => ProductFunc.create(product, a)),
    );

    const prodAlertList: ProductAlert[] = go(
      alertList,
      map((a: string) => ProductAlert.create(product, a)),
    );

    const prodSeList: ProductSideEffect[] = go(
      seList,
      map((a: string) => ProductSideEffect.create(product, a)),
    );

    await Promise.all([
      this.prodRmaRepo.upsert(prodRmaList, ['productId', 'rmaId']),
      this.prodFuncRepo.upsert(prodFuncList, ['productId', 'func']),
      this.prodAlertRepo.upsert(prodAlertList, ['productId', 'alert']),
      this.prodSeRepo.upsert(prodSeList, ['productId', 'sideEffect']),
    ]);
  }
}
