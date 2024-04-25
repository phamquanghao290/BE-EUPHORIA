import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() categories: CreateCategoryDto) {
    const result = await this.categoryService.create(categories);
    const allCategory = await this.categoryService.findAll();
    return {
      message: 'Thêm thành công',
      data: allCategory,
    };
  }

  @Get()
  async findAllCategory() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.update(+id, updateCategoryDto);
    const allCategory = await this.categoryService.findAll();
    return {
      message: 'Cập nhật category thành công',
      data: allCategory,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.categoryService.remove(+id);
    const allCategory = await this.categoryService.findAll();
    return { message: 'Xóa thành công', data: allCategory };
  }
}
