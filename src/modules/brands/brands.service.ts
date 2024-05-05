import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class BrandService {
  constructor(@InjectRepository(Brand) private brandRepos: Repository<Brand>) {}

  async create(createBrandDto: CreateBrandDto) {
    log(createBrandDto);
    const result = await this.brandRepos.create(createBrandDto);
    log(result);
    return this.brandRepos.save(result);
  }

  async findAll() {
    return await this.brandRepos.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    return await this.brandRepos
      .createQueryBuilder()
      .update(Brand)
      .set(updateBrandDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.brandRepos.delete(id);
  }
}
