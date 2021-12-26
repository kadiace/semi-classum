import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/space/entities/space.entity';
import { User } from 'src/user/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postService: Repository<Post>) {}

  create(user: User, space: Space, createPostDto: CreatePostDto) {
    const temp = new Post()
    temp.text = createPostDto.text
    temp.isnotify = createPostDto.isnotify
    temp.uploaderId = createPostDto.uploaderId
    temp.uploader = user
    temp.spaceId = createPostDto.spaceId
    temp.space = space
    return this.postService.save(temp);
  }

  findAll() {
    return this.postService.find({ withDeleted: true });
  }

  findOne(id: number) {
    return this.postService.findOne({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  async remove(postId: number, userId: number) {
    const info = await getRepository(Post)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.space', 'space')
        .where('post.id = :id', { id: postId })
        .getOne()
    if (!info) { console.log('Cannot find space.') } 
    else {
      if ((userId != info.uploaderId) 
        && (userId != info.space.adminId)) {
            console.log('Permission denied')
      }
      else { return this.postService.softDelete(postId); }
    }
  }

  async removeForce(id: number) {
    return this.postService.delete(id)
  }

  async restore(postId: number, userId: number) {
    // const info = await getRepository(Post)
    //     .createQueryBuilder('post')
    //     .leftJoinAndSelect('post.space', 'space')
    //     .where('post.id = :id', { id: postId })
    //     .getOne()
    const info = await this.postService.findOne(postId, {
      withDeleted: true,
      relations: ['space']
    })
    if (!info) { console.log('Cannot find space.') } 
    else {
      if ((userId != info.uploaderId) 
        && (userId != info.space.adminId)) {
            console.log('Permission denied')
      }
      else { return this.postService.restore(postId); }
    }
  }
}
