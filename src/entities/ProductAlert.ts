import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Product } from './Product';

@Unique('UKo5ion0vhjce5k9rc4xxnmp7ig', ['alert', 'productId'])
@Entity('product_alert', { schema: 'xcare_nest' })
export class ProductAlert {
  static create(product: Product, alert: string) {
    const res = new ProductAlert();
    res.productId = product.id;
    res.alert = alert;
    return res;
  }

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
