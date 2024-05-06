import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailRepo: Repository<OrderDetail>,
  ) {}
  async createBillDetailer(
    order_id: number,
    product_id: number,
    quantity: number,
  ) {
    const createOderDetail = {
      order: order_id as any,
      product: product_id as any,
      quantity: quantity,
    };
    const data = await this.orderDetailRepo.create(createOderDetail);
    await this.orderDetailRepo.save(data);
    return 'more success';
  }
  async updateStocksProduct(productId: number, quantity: number) {
    await this.orderDetailRepo
      .createQueryBuilder()
      .update(Product)
      .set({
        stock: () => `stock - ${quantity}`,
      })
      .where('id = :id', { id: productId })
      .execute();
  }
  findAll() {
    return `This action returns all orderDetail`;
  }

  async findByOrder(id: number) {
    const result = await this.orderDetailRepo
      .createQueryBuilder('orderDetail')
      .leftJoinAndSelect('orderDetail.product', 'productId')
      .innerJoinAndSelect('orderDetail.order', 'orderId')
      .innerJoinAndSelect('orderId.user', 'userId')
      .where('userId.id = :id', { id })
      .where('orderId.id = :id', { id })
      .where('orderDetail.order = :id', { id })
      .getMany();
    return result;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
