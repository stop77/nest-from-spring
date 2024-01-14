import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';

@Index('UKo5ion0vhjce5k9rc4xxnmp7ig', ['alert', 'productId'], { unique: true })
@Entity('product_alert', { schema: 'xcare_nest' })
export class ProductAlert {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'alert', length: 20 })
  alert: string;

  @Column('bigint', { name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.productAlerts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
