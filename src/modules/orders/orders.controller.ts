import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
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

  @Put('/cancelOrder/:id')
  async update(@Param('id') id: CreateOrderDto, @Res() res:any) {
    const result = await this.orderService.cancelOrder(+id);
    res.status(200).json(result)
  }

  @Put('/acceptOrder/:id')
  updateStatus(@Param('id') id: string, @Res() res:any) {
    const result = this.orderService.acceptOrder(+id);
    res.status(200).json(result)
  }

  

  @Delete(':id')
  remove(@Param('id') id: CreateOrderDto) {
    return this.orderService.remove(+id);
  }
}
