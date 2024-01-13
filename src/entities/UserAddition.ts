import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('user_addition', { schema: 'xcare_nest' })
export class UserAddition {
  static create(birth: Date) {
    const addition = new UserAddition();
    addition.birth = birth;

    return addition;
  }
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('date', { name: 'birth', nullable: true })
  birth: Date | null;

  @Column('varchar', { name: 'intake_goals', nullable: true, length: 255 })
  intakeGoals: string | null;

  @Column('varchar', { name: 'job', nullable: true, length: 20 })
  job: string | null;

  @Column('varchar', { name: 'profile_img', nullable: true, length: 255 })
  profileImg: string | null;

  @Column('int', { name: 'shift_freq', nullable: true })
  shiftFreq: number | null;

  @Column('int', { name: 'sleep', nullable: true })
  sleep: number | null;

  @Column('datetime', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('int', { name: 'work', nullable: true })
  work: number | null;

  @OneToOne(() => User, (user) => user.userAddition)
  user: User;
}
