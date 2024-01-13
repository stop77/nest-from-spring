import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Combination } from './Combination';
import { RecommendCache } from './RecommendCache';
import { Health } from './Health';
import { UserAddition } from './UserAddition';
import { CalcTarget } from './CalcTarget';
import { UserIntaking } from './UserIntaking';
import { UserProduct } from './UserProduct';

@Index('UK_ei8jgeq8ly91ng06qp4g1m9ih', ['healthId'], { unique: true })
@Index('UK_aa537hmoeyr4twamr5e3f88i5', ['userAdditionId'], { unique: true })
@Index('UK_fhdmksaychudqqwxlp4iybsss', ['pushToken'], { unique: true })
@Index('UK_91w957muiqgpeks88u4ettvih', ['uniqId'], { unique: true })
@Index('UK_sddp1uqc7iyg97m4djn1hreqt', ['calcTargetId'], { unique: true })
@Entity('user', { schema: 'xcare_nest' })
export class User {
  static create(
    uniqId: string,
    password: string,
    nick: string,
    health: Health,
    addition: UserAddition,
  ) {
    const user = new User();

    user.nick = nick;
    user.uniqId = uniqId;
    user.health = health;
    user.userAddition = addition;
    user.password = password;

    return user;
  }

  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @Column('bit', { name: 'diagnose', default: false })
  diagnose: boolean;

  @Column('varchar', { name: 'nick', nullable: true, length: 10 })
  nick: string | null;

  @Column('varchar', {
    name: 'push_token',
    nullable: true,
    unique: true,
    length: 255,
  })
  pushToken: string | null;

  @Column('varchar', {
    name: 'uniq_id',
    unique: true,
    length: 15,
  })
  uniqId: string;

  @Column('varchar', {
    name: 'password',
    unique: true,
    length: 255,
  })
  password: string;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('bigint', { name: 'calc_target_id', nullable: true, unique: true })
  calcTargetId: string | null;

  @Column('bigint', { name: 'health_id', unique: true })
  healthId: string;

  @Column('bigint', { name: 'user_addition_id', unique: true })
  userAdditionId: string;

  @OneToMany(() => Combination, (combination) => combination.user)
  combinations: Combination[];

  @OneToOne(() => RecommendCache, (recommendCache) => recommendCache.user)
  recommendCache: RecommendCache;

  @OneToOne(() => Health, (health) => health.user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'health_id', referencedColumnName: 'id' }])
  health: Health;

  @OneToOne(() => UserAddition, (userAddition) => userAddition.user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_addition_id', referencedColumnName: 'id' }])
  userAddition: UserAddition;

  @OneToOne(() => CalcTarget, (calcTarget) => calcTarget.user, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'calc_target_id', referencedColumnName: 'id' }])
  calcTarget: CalcTarget;

  @OneToMany(() => UserIntaking, (userIntaking) => userIntaking.user)
  userIntakings: UserIntaking[];

  @OneToMany(() => UserProduct, (userProduct) => userProduct.user)
  userProducts: UserProduct[];
}
