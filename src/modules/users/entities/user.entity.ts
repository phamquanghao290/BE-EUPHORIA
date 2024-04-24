import { Cart } from 'src/modules/cart/entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FavoriteProduct } from 'src/modules/favorite_product/entities/favorite_product.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

enum Role {
    ADMIN,
    USER = 0,
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({
        type: 'int',
        default: Role.USER,
    })
    role: string;

    @Column({
        type: 'tinyint',
        default: 1,
    })
    status: number;

    @OneToMany(() => Cart, (cart) => cart.user)
    cart: Cart;
    
    @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user)
    favoriteProduct: FavoriteProduct;

    @OneToMany(() => Order, (order) => order.user)
    order: Order;
}
