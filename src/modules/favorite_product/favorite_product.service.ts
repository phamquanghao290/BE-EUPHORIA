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

  async create(user_id, product_id) {
    const result = await this.favoriteProductRepos
      .createQueryBuilder('favoriteProduct')
      .leftJoinAndSelect('favoriteProduct.user', 'user')
      .leftJoinAndSelect('favoriteProduct.product', 'product')
      .where('user_id = :user_id', { user_id }) // Sửa thành { user: user }
      .andWhere('product_id = :product_id', { product_id }) // Sửa thành { product: product }
      .execute();
    if (result.length == 0) {
      const addProduct = await this.favoriteProductRepos
        .createQueryBuilder()
        .insert()
        .into(FavoriteProduct)
        .values({ user: user_id, product: product_id })
        .execute();
      return {
        message: 'Thêm thành công',
        data: addProduct,
      };
    } else {
      return {
        message: 'Sản phẩm đã có trong yêu thích',
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

  remove(id: number) {
    const result = this.favoriteProductRepos.delete(id);
    return result;
  }
}
