import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/space/entities/space.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { Userspace } from './entities/userspace.entity';

@Injectable()
export class UserspaceService {
  constructor(@InjectRepository(Userspace) private userspaceService: Repository<Userspace>) {}
  create(createUserspaceDto: CreateUserspaceDto) {
    return this.userspaceService.save(createUserspaceDto)
  }

  findAll() {
    return this.userspaceService.find();
  }

  async findByUser(id: number) {
    const info = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.spaces', 'space')
        .where('user.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.spaces }
  }

  async findBySpace(id: number) {
    const info = await getRepository(Space)
        .createQueryBuilder('space')
        .leftJoinAndSelect('space.users', 'user')
        .where('space.id = :id', { id: id })
        .getOne()
    if (!info) { console.log('there is no user.') }
    else { return info.users }
  }

  remove(id: number) {
    return this.userspaceService.delete({id});
  }
}
