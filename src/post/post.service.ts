import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/space/entities/space.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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
    return this.postService.find();
  }

  findOne(id: number) {
    return this.postService.findOne({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return this.postService.delete({id});
  }
}
