import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/space/entities/space.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "./entities/user.entity";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}
  
  async create(createUserDto: CreateUserDto) {
    const hashPW = await bcrypt.hash(createUserDto.password, +process.env.SALT_OR_ROUNDS);
    createUserDto.password = hashPW
    return this.userService.save(createUserDto);
  }

  findAll() {
    return this.userService.find({withDeleted: true});
  }

  findOne(id: number) {
    return this.userService.findOne({id});
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentRefreshToken = refreshToken
    await this.userService.update(id, { currentRefreshToken });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
    const user = await this.findOne(id);
    if (user.currentRefreshToken == refreshToken) {
      return user;
    }
  }

  async removeRefreshToken(id: number) {
    return this.userService.update(id, {
      currentRefreshToken: null,
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const info = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: username})
      .getOne()
    return info
  }

  async findByAdmin(id: number): Promise<Space[] | undefined> {
    const user = await this.userService.findOne(id, { relations: ['adspaces']})
    return user.adspaces
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashPW = await bcrypt.hash(updateUserDto.password, +process.env.SALT_OR_ROUNDS);
      updateUserDto.password = hashPW
      console.log(hashPW)
    }
    return this.userService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userService.delete({id});
  }

  async softDelete(id: number) {
    const user = await this.userService.findOne(id, {
      relations: [ 'spaces', 'adspaces', ],
    });
    return this.userService.softRemove(user);
  }

  async restore(id: number) {
    const user = await this.userService.findOne(id, {
      relations: [ 'spaces', 'adspaces', ],
      withDeleted: true,
    });
    return this.userService.recover(user)
  }
}
