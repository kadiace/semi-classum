import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(@InjectRepository(Like) private likeService: Repository<Like>) {}
  create(createLikeDto: CreateLikeDto) {
    return this.likeService.save(createLikeDto)
  }

  findAll() {
    return this.likeService.find()
  }

  findOne(id: number) {
    return this.likeService.findOne(id)
  }

  // update(id: number, updateLikeDto: UpdateLikeDto) {
  //   return `This action updates a #${id} like`;
  // }

  remove(id: number) {
    return this.likeService.delete({id})
  }
}
