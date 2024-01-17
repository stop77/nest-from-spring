import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { ProductCombination } from './ProductCombination';
import { BoolTinyintTransformer } from '../general/transformer';

@Index('UK4uxtqhkm16fhp8vnhvgfypan6', ['userId', 'name'], { unique: true })
@Entity('combination', { schema: 'xcare_nest' })
export class Combination {
  static create(user: User, name: string, imgUrl: string) {
    const newComb = new Combination();
    newComb.defaults = false;
    newComb.name = name;
    newComb.userId = user.id;
    newComb.thumbnail = imgUrl;
    return newComb;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('tinyint', {
    name: 'defaults',
    default: false,
    transformer: new BoolTinyintTransformer(),
  })
  defaults: boolean;

  @UpdateDateColumn({
    name: 'last_updated_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  lastUpdatedAt: Date;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'thumbnail', length: 255 })
  thumbnail: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.combinations, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(
    () => ProductCombination,
    (productCombination) => productCombination.combination,
  )
  productCombinations: ProductCombination[];
}
