import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UpdateUserspaceDto } from './dto/update-userspace.dto';
import { Userspace } from './entities/userspace.entity';

@Injectable()
export class UserspaceService {
  constructor(@InjectRepository(Userspace) private userSpaceService: Repository<Userspace>) {}
  create(createUserspaceDto: CreateUserspaceDto) {
    return this.userSpaceService.save(createUserspaceDto)
  }

  findAll() {
    return `This action returns all userspace`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userspace`;
  }

  update(id: number, updateUserspaceDto: UpdateUserspaceDto) {
    return `This action updates a #${id} userspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} userspace`;
  }
}
