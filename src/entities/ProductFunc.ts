import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './Product';

@Unique('UKma3177mnb6aw4odia4dh19fmg', ['func', 'productId'])
@Entity('product_func', { schema: 'xcare_nest' })
export class ProductFunc {
  static create(product: Product, func: string) {
    const res = new ProductFunc();
    res.productId = product.id;
    res.func = func;
    return res;
  }
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'func', length: 10 })
  func: string;

  @Column('bigint', { name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.productFuncs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
