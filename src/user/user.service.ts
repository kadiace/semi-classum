import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return this.userService.save(createUserDto);
  }

  findAll() {
    return this.userService.find();
  }

  findOne(id: number) {
    return this.userService.findOne({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userService.delete({id});
  }
}
