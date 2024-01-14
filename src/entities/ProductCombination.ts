import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Combination } from './Combination';
import { Product } from './Product';

@Index('FK4e2s37pvqr9mb6xby90vd8nkm', ['combinationId'], {})
@Index('FKdf9osxb78uw9bvw5hiqrcaarq', ['productId'], {})
@Entity('product_combination', { schema: 'xcare_nest' })
export class ProductCombination {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'combination_id' })
  combinationId: string;

  @Column('bigint', { name: 'product_id' })
  productId: string;

  @ManyToOne(
    () => Combination,
    (combination) => combination.productCombinations,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'combination_id', referencedColumnName: 'id' }])
  combination: Combination;

  @ManyToOne(() => Product, (product) => product.productCombinations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
