import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HffRma } from './HffRma';
import { MedicAi } from './MedicAi';

@Index('FKs23vwssd29mh5uneiq40b2gio', ['medicAiId'], {})
@Index('FKpexcd6wlyc8e534mtlsc491h3', ['hffRmaId'], {})
@Entity('badrelations', { schema: 'xcare_nest' })
export class Badrelations {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'belongs_to', nullable: true, length: 150 })
  belongsTo: string | null;

  @Column('varchar', { name: 'category1', nullable: true, length: 50 })
  category1: string | null;

  @Column('varchar', { name: 'category2', length: 200 })
  category2: string;

  @Column('varchar', { name: 'side_effect', length: 200 })
  sideEffect: string;

  @Column('bigint', { name: 'medic_ai_id' })
  medicAiId: string;

  @Column('bigint', { name: 'hff_rma_id' })
  hffRmaId: string;

  @ManyToOne(() => HffRma, (hffRma) => hffRma.badrelations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'hff_rma_id', referencedColumnName: 'hffRmaId' }])
  hffRma: HffRma;

  @ManyToOne(() => MedicAi, (medicAi) => medicAi.badrelations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'medic_ai_id', referencedColumnName: 'medicAiId' }])
  medicAi: MedicAi;
}
