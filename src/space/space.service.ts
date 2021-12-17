import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';

@Injectable()
export class SpaceService {
  constructor(@InjectRepository(Space) private space: Repository<Space>) {
    this.space = space;
  }
  create(createSpaceDto: CreateSpaceDto) {
    return this.space.save(createSpaceDto);
  }

  findAll() {
    return this.space.find();
  }

  findOne(id: number) {
    return this.space.findOne({id});
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return `This action updates a #${id} space`;
  }

  remove(id: number) {
    return `This action removes a #${id} space`;
  }
}
