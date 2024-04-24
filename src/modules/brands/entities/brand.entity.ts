import { Product } from "src/modules/products/entities/product.entity";
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";

@Entity("brands")
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_brand: string;

    @OneToMany(() => Product, (product) => product.brand)
    product: Product[];
}
