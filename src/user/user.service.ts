import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { getRepository, Repository } from 'typeorm';
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

  async findByAdmin(id: number) {
    const info = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.adspaces', 'space')
        .where('user.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.adspaces }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userService.delete({id});
  }
}
