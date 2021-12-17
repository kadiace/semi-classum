import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space) private spaceService: Repository<Space>) {}
  
  create(user: User,createSpaceDto: CreateSpaceDto) {
    const space = new Space()
    space.title = createSpaceDto.title
    space.admin = user
    return this.spaceService.save(space);
  }

  findAll() {
    return this.spaceService.find();
  }

  findOne(id: number) {
    return this.spaceService.findOne({id});
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return this.spaceService.delete({id});
  }
}
