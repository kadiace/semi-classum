import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateUserspaceDto } from 'src/userspace/dto/create-userspace.dto';
import { UserspaceService } from 'src/userspace/userspace.service';
import { getRepository, Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space) private spaceService: Repository<Space>,
    private readonly userspaceService: UserspaceService) {}
  
  // create space, save who made this, link them to 'userspace'.
  async create(user: User,createSpaceDto: CreateSpaceDto) {
    const temp = new Space()
    temp.title = createSpaceDto.title
    temp.adminId = user.id
    temp.admin = user
    const space = this.spaceService.save(temp);

    const createUserspaceDto = new CreateUserspaceDto()
    createUserspaceDto.user = user
    createUserspaceDto.space = await space
    
    return this.userspaceService.create(createUserspaceDto)
  }

  findAll() {
    return this.spaceService.find();
  }

  findOne(id: number) {
    return this.spaceService.findOne({id});
  }

  async findBySpace(id: number): Promise<Post[] | undefined> {
    const space = await this.spaceService.findOne(id, { relations: ['posts'] })
    return space.posts
  }

  async findQuestionBySpace(id: number): Promise<Post[] | undefined> {
    const info = await getRepository(Space)
        .createQueryBuilder('space')
        .leftJoinAndSelect('space.posts', 'post')
        .where('space.id = :id', { id: id })
        .andWhere('post.isnotify = :bool', { bool: 0 })
        .getOne()
    return info.posts
  }

  async findNotifyBySpace(id: number): Promise<Post[] | undefined> {
    const info = await getRepository(Space)
        .createQueryBuilder('space')
        .leftJoinAndSelect('space.posts', 'post')
        .where('space.id = :id', { id: id })
        .andWhere('post.isnotify = :bool', { bool: 1 })
        .getOne()
    return info.posts
  }

  update(id: number, updateSpaceDto: UpdateSpaceDto) {
    return this.spaceService.update(id, updateSpaceDto);
  }

  async remove(spaceId: number, userId: number) {
    const info = await this.findOne(spaceId)
    if (!info) { console.log('Cannot find space.') }
    else {
      if (info.adminId != userId){ console.log('Not admin.') }
      else { 
        const space = await this.spaceService.findOne(spaceId, {
          relations: [ 'users' ],
        });
        return this.spaceService.softRemove(space); 
      }
    }
  }
  async removeForce(spaceId: number) {
    return this.spaceService.delete(spaceId)
  }

  async restore(spaceId: number, userId: number) {
    const info = await this.spaceService.findOne(spaceId, { withDeleted: true })
    if (!info) { console.log('Cannot find space.') }
    else {
      if (info.adminId != userId){ console.log('Not admin.') }
      else {
        const space = await this.spaceService.findOne(spaceId, {
          relations: [ 'users' ],
        });
        return this.spaceService.recover(space);
      }
    }
  }

}
