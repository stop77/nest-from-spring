import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { ProductCombination } from './ProductCombination';

@Index('UK4uxtqhkm16fhp8vnhvgfypan6', ['userId', 'name'], { unique: true })
@Entity('combination', { schema: 'xcare_nest' })
export class Combination {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bit', { name: 'defaults', default: false })
  defaults: boolean;

  @Column('datetime', { name: 'last_updated_at' })
  lastUpdatedAt: Date;

  @Column('int', { name: 'month_expenses' })
  monthExpenses: number;

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
