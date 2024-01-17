import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('calc_target', { schema: 'xcare_nest' })
export class CalcTarget {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'main_category', length: 255 })
  mainCategory: string;

  @Column('int', { name: 'start_age' })
  startAge: number;

  @OneToOne(() => User, (user) => user.calcTarget)
  user: User;
}
