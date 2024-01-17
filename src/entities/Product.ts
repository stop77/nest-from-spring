import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCombination } from './ProductCombination';
import { ProductRma } from './ProductRma';
import { ProductFunc } from './ProductFunc';
import { ProductSideEffect } from './ProductSideEffect';
import { ProductAlert } from './ProductAlert';

@Index('UK_4fp0iep4apkdxxggya35q11bq', ['serial'], { unique: true })
@Index('i_gubun', ['gubun'], {})
@Entity('product', { schema: 'xcare_nest' })
export class Product {
  static create(
    gubun: string,
    image: string,
    manufacturer: string,
    name: string,
    serial: string,
    price: number,
  ) {
    const res = new Product();
    res.gubun = gubun;
    res.image = image;
    res.manufacturer = manufacturer;
    res.name = name;
    res.serial = serial;
    res.price = price.toString();

    res.activated = true;
    res.totalFavorites = '0';
    res.views = '0';

    return res;
  }
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', { name: 'activated' })
  activated: boolean;

  @Column('varchar', { name: 'gubun', length: 255 })
  gubun: string;

  @Column('varchar', { name: 'image', length: 255 })
  image: string;

  @UpdateDateColumn({
    name: 'last_updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastUpdatedAt: Date;

  @Column('varchar', { name: 'manufacturer', length: 255 })
  manufacturer: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'serial', unique: true, length: 255 })
  serial: string;

  @Column('bigint', { name: 'total_favorites' })
  totalFavorites: string;

  @Column('bigint', { name: 'views' })
  views: string;

  @Column('bigint', { name: 'price' })
  price: string;

  @OneToMany(
    () => ProductCombination,
    (productCombination) => productCombination.product,
  )
  productCombinations: ProductCombination[];

  @OneToMany(() => ProductRma, (productRma) => productRma.product)
  productRmas: ProductRma[];

  @OneToMany(() => ProductAlert, (productAlert) => productAlert.product)
  productAlerts: ProductAlert[];

  @OneToMany(() => ProductFunc, (productFunc) => productFunc.product)
  productFuncs: ProductFunc[];
  @OneToMany(
    () => ProductSideEffect,
    (productSideEffect) => productSideEffect.product,
  )
  productSideEffects: ProductSideEffect[];
}
