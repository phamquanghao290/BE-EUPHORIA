import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { FavoriteProduct } from 'src/modules/favorite_product/entities/favorite_product.entity';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum Rating {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_product: string;

    @Column({
        nullable: true,
        type: 'text'
    })
    image: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @Column()
    stock: number;

    @Column({
        nullable: true,
        type: 'enum',
        enum: Rating,
    })
    rating: number;

    @OneToMany(() => Cart, (cart) => cart.product)
    cart: Cart[];

    @ManyToOne(() => Brand, (brand) => brand.product)
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @ManyToOne(() => Category, (category) => category.product)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.product)
    favoriteProduct: FavoriteProduct[];

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
    orderDetail: OrderDetail[];
}
