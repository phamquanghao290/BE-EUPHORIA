import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavoriteProductService } from './favorite_product.service';
import { CreateFavoriteProductDto } from './dto/create-favorite_product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite_product.dto';

@Controller('api/v1/favorite-product')
export class FavoriteProductController {
  constructor(
    private readonly favoriteProductService: FavoriteProductService,
  ) {}

  @Post(':id')
  create(@Param('id') user_id: string, @Body() product_id: any) {
    const { id } = product_id;
    return this.favoriteProductService.create(+user_id, id);
  }

  @Get(':id')
  findAll(@Param('id') user_id: string) {
    return this.favoriteProductService.findAll(+user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteProductService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteProductDto: UpdateFavoriteProductDto,
  ) {
    return this.favoriteProductService.update(+id, updateFavoriteProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const result = this.favoriteProductService.remove(+id);
    return result
   
  }
}
