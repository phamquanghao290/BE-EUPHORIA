import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get('getCartByUserId/:id')
  async getCartByUserId(@Param() userId: any,@Res() res:any) {
    const result = await this.cartService.findOne(Number(userId.id));
    res.status(200).json(result);
  }

  @Post('addToCart')
  async create(@Body() createCartDto: any , @Res() res:any) {
    const { product, userId } = createCartDto;
    const check = await this.cartService.getCartByUserId(userId, product.id);
    if (check.length > 0) {
      res.status(200).json({
        message: 'Products already in the cart',
      })
    }else {
      const result = await this.cartService.create(userId, product);
      res.status(201).json({
        result,
        message:"Add product to cart successfully"
      })
    }
  }

  @Put('increase')
  async increase(@Body() createCartDto: any, @Res() res:any) {
    const result = await this.cartService.increaseStock(createCartDto);
    res.status(200).json(result);
  }

  @Put('decrease')
  async decrease(@Body() createCartDto: any, @Res() res:any) {
    const result = await this.cartService.decreaseStock(createCartDto);
    res.status(200).json(result);
  }

  @Get('all-cart')
  async findAll() {
    return await this.cartService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res:any) {
    const result = await this.cartService.remove(+id);
    res.status(200).json(result);
  }
  @Delete('all/:id')
  deleteCartUser(@Param('id') id: string, @Res() res:any) {
    const result = this.cartService.deleteAll(+id);
    res.status(200).json(result);
  }
}
