import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Index("FKnw43wab2rt35jmofmpbhkibco", ["productId"], {})
@Index("FKq5o2e33vlwpfc2k1mredtia6p", ["userId"], {})
@Entity("user_product", { schema: "xcare_nest" })
export class UserProduct {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "product_id" })
  productId: string;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @ManyToOne(() => Product, (product) => product.userProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => User, (user) => user.userProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
