import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCombination } from './ProductCombination';
import { ProductRma } from './ProductRma';
import { UserProduct } from './UserProduct';
import { ProductFunc } from './ProductFunc';
import { ProductSideEffect } from './ProductSideEffect';
import { ProductAlert } from './ProductAlert';

@Index('UK_4fp0iep4apkdxxggya35q11bq', ['serial'], { unique: true })
@Index('i_gubun', ['gubun'], {})
@Entity('product', { schema: 'xcare_nest' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bit', { name: 'activated' })
  activated: boolean;

  @Column('varchar', { name: 'gubun', length: 255 })
  gubun: string;

  @Column('varchar', { name: 'image', length: 255 })
  image: string;

  @Column('datetime', { name: 'last_updated_at' })
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

  @OneToMany(() => UserProduct, (userProduct) => userProduct.product)
  userProducts: UserProduct[];

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
