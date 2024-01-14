import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { Product } from '../entities/Product';
import { Combination } from '../entities/Combination';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Combination)
    private combRepo: Repository<Combination>,
    @InjectRepository(Product)
    private prodRepo: Repository<Product>,
  ) {}

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
}
