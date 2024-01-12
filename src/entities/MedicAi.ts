import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Badrelations } from "./Badrelations";
import { MedicProductAi } from "./MedicProductAi";

@Index("UK_irx0j46iwe1ly5d4s55lpbg28", ["enName"], { unique: true })
@Entity("medic_ai", { schema: "xcare_nest" })
export class MedicAi {
  @PrimaryGeneratedColumn({ type: "bigint", name: "medic_ai_id" })
  medicAiId: string;

  @Column("varchar", {
    name: "en_name",
    nullable: true,
    unique: true,
    length: 50,
  })
  enName: string | null;

  @Column("varchar", { name: "ko_name", length: 50 })
  koName: string;

  @OneToMany(() => Badrelations, (badrelations) => badrelations.medicAi)
  badrelations: Badrelations[];

  @OneToMany(() => MedicProductAi, (medicProductAi) => medicProductAi.medicAi)
  medicProductAis: MedicProductAi[];
}
