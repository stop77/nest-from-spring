import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HffRma } from "./HffRma";
import { CalcTarget } from "./CalcTarget";

@Index("UK4t9x7bjiqbuf0r9qwr1feycqb", ["calcTargetId", "rmaId"], {
  unique: true,
})
@Index("FKevb3r76anc2f45tqosnwb1pwy", ["rmaId"], {})
@Entity("nutrition_score", { schema: "xcare_nest" })
export class NutritionScore {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("float", { name: "end100", nullable: true, precision: 12 })
  end100: number | null;

  @Column("float", { name: "exact100", nullable: true, precision: 12 })
  exact100: number | null;

  @Column("float", { name: "score80", nullable: true, precision: 12 })
  score80: number | null;

  @Column("float", { name: "start100", nullable: true, precision: 12 })
  start100: number | null;

  @Column("float", { name: "zero", nullable: true, precision: 12 })
  zero: number | null;

  @Column("bigint", { name: "calc_target_id" })
  calcTargetId: string;

  @Column("bigint", { name: "rma_id" })
  rmaId: string;

  @ManyToOne(() => HffRma, (hffRma) => hffRma.nutritionScores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "rma_id", referencedColumnName: "hffRmaId" }])
  rma: HffRma;

  @ManyToOne(() => CalcTarget, (calcTarget) => calcTarget.nutritionScores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "calc_target_id", referencedColumnName: "id" }])
  calcTarget: CalcTarget;
}
