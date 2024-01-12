import {
  Column,
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
@Index('UK_ob8kqyqqgmefl0aco34akdtpe', ['email'], { unique: true })
@Index('UK_fhdmksaychudqqwxlp4iybsss', ['pushToken'], { unique: true })
@Index('UK_91w957muiqgpeks88u4ettvih', ['uniqId'], { unique: true })
@Index('UK_kbxiti095ck9nrjpey4cj61rj', ['uniqKey'], { unique: true })
@Index('UK_sddp1uqc7iyg97m4djn1hreqt', ['calcTargetId'], { unique: true })
@Entity('user', { schema: 'xcare_nest' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('bit', { name: 'deleted' })
  deleted: boolean;

  @Column('datetime', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('bit', { name: 'diagnose' })
  diagnose: boolean;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 45,
  })
  email: string | null;

  @Column('datetime', { name: 'last_access' })
  lastAccess: Date;

  @Column('varchar', { name: 'nick', nullable: true, length: 10 })
  nick: string | null;

  @Column('varchar', { name: 'provider', length: 10 })
  provider: string;

  @Column('varchar', {
    name: 'push_token',
    nullable: true,
    unique: true,
    length: 255,
  })
  pushToken: string | null;

  @Column('varchar', {
    name: 'uniq_id',
    nullable: true,
    unique: true,
    length: 255,
  })
  uniqId: string | null;

  @Column('bigint', { name: 'uniq_key', nullable: true, unique: true })
  uniqKey: string | null;

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
