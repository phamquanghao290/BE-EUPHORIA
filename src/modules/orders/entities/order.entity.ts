import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusOrder {
  Pending = 0,
  Accepted = 1,
  Completed = 2,
  Canceled = 3,
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
    })
    address: string;

    @Column({
        type: 'text',
    })
    address_city: string;

    @Column()
    phone: string;

    @Column({
        type: 'enum',
        enum: StatusOrder,
        default: StatusOrder.Pending,
    })
    status_order: StatusOrder;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    total: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.order)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail[];
}
