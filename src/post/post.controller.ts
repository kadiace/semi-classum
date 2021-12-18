import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const space = this.spaceService.findOne(createPostDto.spaceId)

    if (createPostDto.isnotify
      && (createPostDto.uploaderId != (await space).adminId)) {
      console.log('Only admin can post notify.')
    }
    else {
      const user = this.userService.findOne(createPostDto.uploaderId)
      return this.postService.create(await user, await space, createPostDto);
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
      const post = this.postService.findOne(+ids_[0])
      if (!(await post)) { console.log('Cannot find space.') }
      else {
        if ((await post).uploaderId != +ids_[1]){ console.log('Not uploader.') }
        else { return this.postService.remove(+ids_[0]) }
      }
    }
  }
}
