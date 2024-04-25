import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('api/brand')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    console.log(createBrandDto);
    const result = await this.brandsService.create(createBrandDto);
    const allBrand = await this.brandsService.findAll();
    return {
      message: 'Thêm thương hiệu thành công',
      data: allBrand,
    };
  }

  @Get()
  async findAll() {
    return await this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.brandsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const result = await this.brandsService.update(+id, updateBrandDto);
    const allBrand = await this.brandsService.findAll();
    return {
      message: 'Cập nhật thương hiệu thành công',
      data: allBrand,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.brandsService.remove(+id);
    const allBrand = await this.brandsService.findAll();
    return { message: 'Xoá thương hiệu thành công', data: allBrand };
  }
}
