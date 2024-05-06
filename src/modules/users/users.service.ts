import { Injectable, Param, SetMetadata } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { log } from 'console';

const PUBLISH_KEY = 'isPublishKey';
export const Publish = () => SetMetadata(PUBLISH_KEY, true);

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getOneUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  create(createUserDto: any) {
    console.log(createUserDto);
    return this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
  }

  async updateStatusUser(id: number) {
    const result = await this.userRepository.findOne({ where: { id: +id } });
    if (result.status == 0) {
      return this.userRepository
        .createQueryBuilder('users')
        .update(User)
        .set({ status: 1 })
        .where({ id: +id })
        .execute();
    } else {
      return this.userRepository
        .createQueryBuilder('users')
        .update(User)
        .set({ status: 0 })
        .where({ id: +id })
        .execute();
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  //update mật khau theo email
  async update(email: string, password: string) {
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ password: password })
      .where({ email: email })
      .execute();
      
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
