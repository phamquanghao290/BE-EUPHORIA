import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post('createBillDetails')
  async create(@Body() createOrderDetailDto: any) {
    const { order_id, product_id, quantity } = createOrderDetailDto;

    return await this.orderDetailService.createBillDetailer(
      order_id,
      product_id,
      quantity,
    ),
       
    await this.orderDetailService.updateStocksProduct(
      product_id,
      quantity,
    )

    // return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: CreateOrderDetailDto) {
    const result = await this.orderDetailService.findByOrder(+id);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: CreateOrderDetailDto,@Body() updateOrderDetailDto: UpdateOrderDetailDto,) {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: CreateOrderDetailDto) {
    return this.orderDetailService.remove(+id);
  }
}
