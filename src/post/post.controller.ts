import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { getConnection, getRepository } from 'typeorm';
import { Space } from '../space/entities/space.entity'
import { Post_ } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const space = this.spaceService.findOne(createPostDto.spaceId)

    if (!(await space)) { console.log('Invalid space') }
    else {
      if (createPostDto.isnotify
        && (createPostDto.uploaderId != (await space).adminId)) {
        console.log('Only admin can post notify.')
      }
      else if (!createPostDto.isnotify
        && (createPostDto.uploaderId == (await space).adminId) ) {
        console.log('Admin can post only notify.')
      }
      else {
        const user = this.userService.findOne(createPostDto.uploaderId)
        if (!(await user)) { console.log('Invalid user') }
        else { return this.postService.create(await user, await space, createPostDto); }
      }
    }
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  // get all posts by space id.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    const ids_ = ids.split('|')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      const info = await getRepository(Post_)
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.space', 'space')
        .where('post.id = :id', { id: +ids[0] })
        .getOne()
      if (!info) { console.log('Cannot find space.') } 
      else {
        if ((+ids_[1] != info.uploaderId) && (+ids_[1] != info.space.adminId)) {
              console.log('Permission denied')
            }
            else { return this.postService.remove(+ids_[0]) }
      }
    }
  }
}
