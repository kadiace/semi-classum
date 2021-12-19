import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { createQueryBuilder, getConnection, getRepository,} from 'typeorm';
import { Space } from '../space/entities/space.entity'
// import { Post } from './entities/post.entity';

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

  // @Delete(':ids')
  // async remove(@Param('ids') ids: string) {
  //   const ids_ = ids.split('/')
  //   if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
  //   else {
  //     const post = this.postService.findOne(+ids_[0])
  //     if (!(await post)) { console.log('Cannot find space.') }
  //     else {
  //       if ((await post).uploaderId != +ids_[1]){ console.log('Not uploader.') }
  //       else { return this.postService.remove(+ids_[0]) }
  //     }
  //   }
  // }
  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    console.log(ids)
    const ids_ = ids.split('|')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      console.log('a')
      const post = await this.postService.findOne(+ids_[0])
      if (!post) { console.log('Cannot find space.') }
      else {
        console.log('b')
        const info = await getConnection()
          .createQueryBuilder()
          .select('space.adminId')
          .from(Space, 'space')
          .where('space.id = :spaceId', { spaceId : post.spaceId })
          .getOne()
        console.log(+ids_[1], post.uploaderId, info.adminId)
        if ((+ids_[1] != post.uploaderId) && (+ids_[1] != info.adminId)) {
          console.log('Permission denied')
        }
        else { return this.postService.remove(+ids_[0]) }
      }
    }
  }
}
