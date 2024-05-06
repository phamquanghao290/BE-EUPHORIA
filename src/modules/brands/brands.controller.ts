import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('api/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    const result = await this.brandService.create(createBrandDto);
    const allBrand = await this.brandService.findAll();
    return { message: 'Add brand successfully', data: allBrand};  
  }

  @Get()
  async findAll() {return await this.brandService.findAll()}

  @Get(':id')
  async findOne(@Param('id') id: string) {return await this.brandService.findOne(+id)}
    
  @Patch(':id')
  async update(@Param('id') id: string,@Body() updateBrandDto: UpdateBrandDto,) {
    const result = await this.brandService.update(+id, updateBrandDto);
    const allBrand = await this.brandService.findAll();
    return {message: 'Update brand successfully',data: allBrand};  
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.brandService.remove(+id);
    const allBrand = await this.brandService.findAll();
    return { message: 'Delete brand successfully', data: allBrand };
  }
}
