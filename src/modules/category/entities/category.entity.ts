import { Product } from "src/modules/products/entities/product.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_category: string;

    @OneToMany(() => Product, (product) => product.category)
    product: Product[];
}
