import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UpdateUserspaceDto } from './dto/update-userspace.dto';
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

  findOne(id: number) {
    return this.userspaceService.findOne(id);
  }

  // update(id: number, updateUserspaceDto: UpdateUserspaceDto) {
  //   return this.userspaceService.update(id, updateUserspaceDto);
  // }

  remove(id: number) {
    return this.userspaceService.delete({id});
  }
}
