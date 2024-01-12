import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MedicProductAi } from "./MedicProductAi";

@Index("i_serial", ["serial"], {})
@Entity("medic_product", { schema: "xcare_nest" })
export class MedicProduct {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "gubun", nullable: true, length: 16 })
  gubun: string | null;

  @Column("varchar", { name: "manufacturer", length: 150 })
  manufacturer: string;

  @Column("text", { name: "name" })
  name: string;

  @Column("varchar", { name: "sector", length: 16 })
  sector: string;

  @Column("varchar", { name: "serial", length: 16 })
  serial: string;

  @OneToMany(() => MedicProductAi, (medicProductAi) => medicProductAi.medicProd)
  medicProductAis: MedicProductAi[];
}
