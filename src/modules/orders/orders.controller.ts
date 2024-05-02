import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './orders.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('getorderById/:id')
  async getBillById(@Param() id: any) {
    return this.orderService.getBillById(id.id);
  }

  @Patch('/cancelOrder/:id')
  async update(@Param('id') id: CreateOrderDto) {
    return await this.orderService.cancelOrder(+id);
    //  await this.orderService.updateStocksProduct(+id,1)
  }

  @Patch('/acceptOrder/:id')
  updateStatus(@Param('id') id: string) {
    return this.orderService.acceptOrder(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: CreateOrderDto) {
    return this.orderService.remove(+id);
  }
}
