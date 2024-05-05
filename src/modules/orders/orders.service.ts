import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { StatusOrder } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private oderRepository: Repository<Order>,
  ) {}
  async createOrder(orderData: any) {
    // Xử lý logic tạo đơn hàng và lưu vào cơ sở dữ liệu
    const {
      user_id,
      created_at,
      address,
      phone,
      status_order,
      total,
      address_city,
    } = orderData;
    const createdOrder = this.oderRepository.create({
      user: user_id,
      total,
      status_order: status_order,
      phone: phone,
      address: address,
      created_at,
      address_city: address_city,
    });

    return await this.oderRepository.save(createdOrder);
  }

  findAll() {
    return this.oderRepository.find();
  }

  async getBillById(id: any) {
    return await this.oderRepository
      .createQueryBuilder('order')
      .where('order.user_id = :id', { id })
      .getMany();
  }
  async cancelOrder(id: number) {
    await this.oderRepository
      .createQueryBuilder()
      .update(Order)
      .set({
        status_order: StatusOrder.Canceled,
      })
      .where({ id: id })
      .execute();

    return 'Cancelled successfully';
  }

  async acceptOrder(id: number) {
    await this.oderRepository
      .createQueryBuilder()
      .update(Order)
      .set({
        status_order: StatusOrder.Accepted,
      })
      .where({ id: id })
      .execute();

    return 'Accepted successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
