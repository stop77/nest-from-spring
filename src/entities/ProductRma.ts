import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HffRma } from './HffRma';
import { Product } from './Product';

@Index('i_rma_vol', ['rmaId', 'stdAmountBefore'], {})
@Unique('prod_rma_unique', ['rmaId', 'productId'])
@Entity('product_rma', { schema: 'xcare_nest' })
export class ProductRma {
  static create(product: Product, rma: HffRma) {
    const res = new ProductRma();
    res.productId = product.id;
    res.rmaId = rma.hffRmaId;

    return res;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('text', { name: 'original', nullable: true })
  original: string | null;

  @Column('float', { name: 'permit_degree_max', nullable: true, precision: 12 })
  permitDegreeMax: number | null;

  @Column('float', { name: 'permit_degree_min', nullable: true, precision: 12 })
  permitDegreeMin: number | null;

  @Column('float', { name: 'std_amount_after', nullable: true, precision: 12 })
  stdAmountAfter: number | null;

  @Column('varchar', {
    name: 'std_amount_after_unit',
    nullable: true,
    length: 255,
  })
  stdAmountAfterUnit: string | null;

  @Column('float', { name: 'std_amount_before', nullable: true, precision: 12 })
  stdAmountBefore: number | null;

  @Column('varchar', {
    name: 'std_amount_before_unit',
    nullable: true,
    length: 255,
  })
  stdAmountBeforeUnit: string | null;

  @Column('float', {
    name: 'std_amount_before_without_degree',
    nullable: true,
    precision: 12,
  })
  stdAmountBeforeWithoutDegree: number | null;

  @Column('bigint', { name: 'product_id' })
  productId: string;

  @Column('bigint', { name: 'rma_id' })
  rmaId: string;

  @ManyToOne(() => HffRma, (hffRma) => hffRma.productRmas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rma_id', referencedColumnName: 'hffRmaId' }])
  rma: HffRma;

  @ManyToOne(() => Product, (product) => product.productRmas, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
