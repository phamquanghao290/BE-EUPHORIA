import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { STATUS_CODES } from 'http';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepos: Repository<Product>,
  ) {}

  async create(createProductDto: any) {
    if (!CreateProductDto) {
      return {
        message: 'Add product failed',
        STATUS_CODES: STATUS_CODES.BAD_REQUEST,
      };
    } else {
      const newProduct = await this.productRepos
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values({
          name_product: createProductDto.nameProduct,
          price: createProductDto.price,
          image: createProductDto.image,
          stock: createProductDto.stock,
          rating: createProductDto.rate,
          category: createProductDto.category_id,
          brand: createProductDto.brand_id,
        })
        .execute();
    }
  }

  async findAll() {
    return await this.productRepos.find({ relations: ['category', 'brand'] });
  }

  async findOne(id: number) {
    return await this.productRepos.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
  }

  async update(id: number, updateProductDto: any) {
    const updateProduct = await this.productRepos
      .createQueryBuilder()
      .update(Product)
      .set({
        name_product: updateProductDto.nameProduct,
        price: updateProductDto.price,
        image: updateProductDto.image,
        stock: updateProductDto.stock,
        rating: updateProductDto.rate,
        category: updateProductDto.category_id as any,
        brand: updateProductDto.brand_id as any,
      })
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.productRepos.delete(id);
  }
  async searchProductsByName(name: string): Promise<Product[]> {
    return this.productRepos
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .where('product.name_product like :name', { name: `%${name}%` })
      .getMany();
  }
}
