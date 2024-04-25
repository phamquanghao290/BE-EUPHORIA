import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepos: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepos.save(
      await this.categoryRepos.create(createCategoryDto),
    );
  }

  async findAll() {
    return await this.categoryRepos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepos
      .createQueryBuilder()
      .update(Category)
      .set(updateCategoryDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.categoryRepos.delete(id);
  }
}
