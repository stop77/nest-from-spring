import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('health', { schema: 'xcare_nest' })
export class Health {
  static create(sex: string) {
    const health = new Health();
    health.sex = sex;

    return health;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'diseases', nullable: true, length: 255 })
  diseases: string | null;

  @Column('int', { name: 'drink', nullable: true })
  drink: number | null;

  @Column('double', { name: 'height', nullable: true, precision: 22 })
  height: number | null;

  @Column('bit', { name: 'lactate', nullable: true })
  lactate: boolean | null;

  @Column('bit', { name: 'pregnant', nullable: true })
  pregnant: boolean | null;

  @Column('varchar', { name: 'sex', nullable: true, length: 1 })
  sex: string | null;

  @Column('bit', { name: 'smoke', nullable: true })
  smoke: boolean | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('double', { name: 'weight', nullable: true, precision: 22 })
  weight: number | null;

  @OneToOne(() => User, (user) => user.health)
  user: User;
}
