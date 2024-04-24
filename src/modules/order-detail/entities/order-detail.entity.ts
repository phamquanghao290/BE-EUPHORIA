import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_detail')
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, (product) => product.orderDetail)
    @JoinColumn({ name: 'product_id' })
    product: Product[];

    @ManyToOne(() => Order, (order) => order.orderDetail)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
