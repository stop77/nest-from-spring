import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Badrelations } from './Badrelations';
import { ProductRma } from './ProductRma';

@Index('UK_c28l415st219amfiqsejinh0q', ['name'], { unique: true })
@Entity('hff_rma', { schema: 'xcare_nest' })
export class HffRma {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'hff_rma_id' })
  hffRmaId: string;

  @Column('varchar', { name: 'name', unique: true, length: 200 })
  name: string;

  @OneToMany(() => Badrelations, (badrelations) => badrelations.hffRma)
  badrelations: Badrelations[];

  @OneToMany(() => ProductRma, (productRma) => productRma.rma)
  productRmas: ProductRma[];
}
