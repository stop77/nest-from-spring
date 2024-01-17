import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('UK_l30gw7p4ecep2591vv5bakmyr', ['userId'], { unique: true })
@Entity('recommend_cache', { schema: 'xcare_nest' })
export class RecommendCache {
  static create(user: User) {
    const cache = new RecommendCache();

    cache.userId = user.id;
    cache.cacheFlag = false;
    cache.additionalPrice = 0;
    cache.additionalScore = 0;
    cache.originalScore = 0;

    return cache;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('float', { name: 'additional_price', precision: 12 })
  additionalPrice: number;

  @Column('float', { name: 'additional_score', precision: 12 })
  additionalScore: number;

  @Column('tinyint', { name: 'cache_flag' })
  cacheFlag: boolean;

  @Column('float', { name: 'calcium', nullable: true, precision: 12 })
  calcium: number | null;

  @Column('float', { name: 'calcium_after', nullable: true, precision: 12 })
  calciumAfter: number | null;

  @Column('float', { name: 'cooper', nullable: true, precision: 12 })
  cooper: number | null;

  @Column('float', { name: 'cooper_after', nullable: true, precision: 12 })
  cooperAfter: number | null;

  @Column('float', { name: 'coq10', nullable: true, precision: 12 })
  coq10: number | null;

  @Column('float', { name: 'coq10_after', nullable: true, precision: 12 })
  coq10After: number | null;

  @Column('float', { name: 'iron', nullable: true, precision: 12 })
  iron: number | null;

  @Column('float', { name: 'iron_after', nullable: true, precision: 12 })
  ironAfter: number | null;

  @Column('float', { name: 'magnesium', nullable: true, precision: 12 })
  magnesium: number | null;

  @Column('float', { name: 'magnesium_after', nullable: true, precision: 12 })
  magnesiumAfter: number | null;

  @Column('float', { name: 'omega3', nullable: true, precision: 12 })
  omega3: number | null;

  @Column('float', { name: 'omega3_after', nullable: true, precision: 12 })
  omega3After: number | null;

  @Column('float', { name: 'original_score', precision: 12 })
  originalScore: number;

  @Column('float', { name: 'selenium', nullable: true, precision: 12 })
  selenium: number | null;

  @Column('float', { name: 'selenium_after', nullable: true, precision: 12 })
  seleniumAfter: number | null;

  @Column('float', { name: 'vitamin_a', nullable: true, precision: 12 })
  vitaminA: number | null;

  @Column('float', { name: 'vitamin_a_after', nullable: true, precision: 12 })
  vitaminAAfter: number | null;

  @Column('float', { name: 'vitamin_b12', nullable: true, precision: 12 })
  vitaminB12: number | null;

  @Column('float', { name: 'vitamin_b12_after', nullable: true, precision: 12 })
  vitaminB12After: number | null;

  @Column('float', { name: 'vitamin_c', nullable: true, precision: 12 })
  vitaminC: number | null;

  @Column('float', { name: 'vitamin_c_after', nullable: true, precision: 12 })
  vitaminCAfter: number | null;

  @Column('float', { name: 'vitamin_d', nullable: true, precision: 12 })
  vitaminD: number | null;

  @Column('float', { name: 'vitamin_d_after', nullable: true, precision: 12 })
  vitaminDAfter: number | null;

  @Column('float', { name: 'vitamin_e', nullable: true, precision: 12 })
  vitaminE: number | null;

  @Column('float', { name: 'vitamin_e_after', nullable: true, precision: 12 })
  vitaminEAfter: number | null;

  @Column('float', { name: 'zinc', nullable: true, precision: 12 })
  zinc: number | null;

  @Column('float', { name: 'zinc_after', nullable: true, precision: 12 })
  zincAfter: number | null;

  @Column('bigint', { name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.recommendCache, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
