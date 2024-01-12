import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MedicAi } from "./MedicAi";
import { MedicProduct } from "./MedicProduct";

@Index("FK8dp4yypvkwh6o43hqxniesc6d", ["medicAiId"], {})
@Index("FKd1j8vdy4kkx4qiqji49jnpj30", ["medicProdId"], {})
@Entity("medic_product_ai", { schema: "xcare_nest" })
export class MedicProductAi {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "medic_ai_id" })
  medicAiId: string;

  @Column("bigint", { name: "medic_prod_id" })
  medicProdId: string;

  @ManyToOne(() => MedicAi, (medicAi) => medicAi.medicProductAis, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "medic_ai_id", referencedColumnName: "medicAiId" }])
  medicAi: MedicAi;

  @ManyToOne(
    () => MedicProduct,
    (medicProduct) => medicProduct.medicProductAis,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "medic_prod_id", referencedColumnName: "id" }])
  medicProd: MedicProduct;
}
