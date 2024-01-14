import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('UKgkxxgyffss5eiiccp1ejx7dqs', ['sideEffect', 'productId'], {
  unique: true,
})
@Entity('product_side_effect', { schema: 'xcare_nest' })
export class ProductSideEffect {
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
