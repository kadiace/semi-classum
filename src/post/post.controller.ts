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

  @Get('space/:id')
  findBySpace(@Param('id') id: string) {
    return this.spaceService.findBySpace(+id);
  }

  @Get('space/:id/notify/:bool')
  findQuestionBySpace(@Param('id') id: string, @Param('bool') bool: string) {
    if (+bool) { 
      console.log('a')
      return this.spaceService.findNotifyBySpace(+id); 
    }
    else { 
      console.log('b')
      return this.spaceService.findQuestionBySpace(+id); 
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':postId/user/:userId')
  async remove(@Param('postId') postId: string, @Param('userId') userId: string) {
    this.postService.remove(+postId, +userId)
  }
}
