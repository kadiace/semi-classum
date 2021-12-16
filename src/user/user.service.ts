import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity"; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {
    this.user = user;
  }
  create(createUserDto: CreateUserDto) {
    console.log('create?')
    return this.user.create(createUserDto);
  }

  findAll() {
    return this.user.find();
  }

  findOne(id: number) {
    return this.user.findOne({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
