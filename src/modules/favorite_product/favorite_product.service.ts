import { Injectable } from '@nestjs/common';
import { CreateFavoriteProductDto } from './dto/create-favorite_product.dto';
import { UpdateFavoriteProductDto } from './dto/update-favorite_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProduct } from './entities/favorite_product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteProductService {
  constructor(
    @InjectRepository(FavoriteProduct)
    private readonly favoriteProductRepos: Repository<FavoriteProduct>,
  ) {}

  async create(user_id, id) {
    const result = await this.favoriteProductRepos
      .createQueryBuilder('favorite_product')
      .leftJoinAndSelect('favorite_product.user', 'user')
      .leftJoinAndSelect('favorite_product.product', 'product')
      .where('user_id = :user_id', { user_id }) // Sửa thành { user: user }
      .andWhere('product_id = :product_id', { product_id: id }) // Sửa thành { product: product }
      .execute();
    if (result.length == 0) {
      const addProduct = await this.favoriteProductRepos
        .createQueryBuilder()
        .insert()
        .into(FavoriteProduct)
        .values({ user: user_id, product: id, quantity: 1 })
        .execute();
      return {
        message: 'More success',
        data: addProduct,
      };
    } else {
      return {
        message: 'The product is already in favorites',
      };
    }
  }

  async findAll(user_id) {
    const product = await this.favoriteProductRepos
      .createQueryBuilder('favoriteProduct')
      .leftJoinAndSelect('favoriteProduct.product', 'product')
      .where('user_id = :user_id', { user_id })
      .getMany();
    return product;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteProduct`;
  }

  update(id: number, updateFavoriteProductDto: UpdateFavoriteProductDto) {
    return `This action updates a #${id} favoriteProduct`;
  }

 async remove(id: number) {
   const result = await this.favoriteProductRepos.delete(id);
   return result
  }
}
