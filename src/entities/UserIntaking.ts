import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { HffRma } from "./HffRma";

@Index("FKtedrrilyp4qllpybv06d0myup", ["rmaId"], {})
@Index("FK5838qsxsqy6hkpgjh9eo7qy9y", ["userId"], {})
@Entity("user_intaking", { schema: "xcare_nest" })
export class UserIntaking {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("int", { name: "score" })
  score: number;

  @Column("varchar", { name: "unit", length: 255 })
  unit: string;

  @Column("float", { name: "volume", precision: 12 })
  volume: number;

  @Column("bigint", { name: "rma_id" })
  rmaId: string;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @ManyToOne(() => User, (user) => user.userIntakings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => HffRma, (hffRma) => hffRma.userIntakings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "rma_id", referencedColumnName: "hffRmaId" }])
  rma: HffRma;
}
