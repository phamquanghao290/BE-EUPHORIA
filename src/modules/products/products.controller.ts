import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { STATUS_CODES } from 'http';
import { Product } from './entities/product.entity';

@Controller('api/product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get('search')
  async searchProducts(@Query('key') name: string): Promise<Product[]> {
    return this.productsService.searchProductsByName(name);
  }
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.create(createProductDto);
    const allProducts = await this.productsService.findAll();
    return {
      message: 'Added product successfully',
      data: allProducts,
      STATUS_CODES: STATUS_CODES.OK,
    };
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    const result = await this.productsService.update(+id, updateProductDto);
    const allProducts = await this.productsService.findAll();
    return {
      message: 'Product update successful',
      data: allProducts,
      STATUS_CODES: STATUS_CODES.OK,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.productsService.remove(+id);
    const allProducts = await this.productsService.findAll();
    return {
      message: 'Product deletion successful',
      data: allProducts,
      STATUS_CODES: STATUS_CODES.OK,
    };
  }
}
