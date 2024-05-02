import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('getCartByUserId/:id')
  async getCartByUserId(@Param() userId: any) {
    return await this.cartService.findOne(Number(userId.id));
  }

  @Post('addToCart')
  async create(@Body() createCartDto: any) {
    const { product, userId } = createCartDto;
    return await this.cartService.create(userId, product);
  }

  @Put('increase')
  async increase(@Body() createCartDto: any) {
    return await this.cartService.increaseStock(createCartDto);
  }

  @Put('decrease')
  async decrease(@Body() createCartDto: any) {
    return await this.cartService.decreaseStock(createCartDto);
  }

  @Get('all-cart')
  async findAll() {
    // lấy ra tất cả user_id trong bảng cart
    return await this.cartService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartService.remove(+id);
  }
  @Delete('all/:id')
  deleteCartUser(@Param('id') id: string) {
    return this.cartService.deleteAll(+id);
  }
}
