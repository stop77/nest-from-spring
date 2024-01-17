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

@Unique('UKgkxxgyffss5eiiccp1ejx7dqs', ['sideEffect', 'productId'])
@Entity('product_side_effect', { schema: 'xcare_nest' })
export class ProductSideEffect {
  static create(product: Product, se: string) {
    const res = new ProductSideEffect();
    res.productId = product.id;
    res.sideEffect = se;
    return res;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'side_effect', nullable: true, length: 30 })
  sideEffect: string | null;

  @Column('bigint', { name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.productSideEffects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
