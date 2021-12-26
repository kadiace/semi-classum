import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { Request } from 'express';
import { UserspaceService } from 'src/userspace/userspace.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService,
    private readonly userspaceService: UserspaceService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const space = await this.spaceService.findOne(createPostDto.spaceId)

    if (!space) { console.log('Invalid space') }
    else {

      if(!(await this.userspaceService.findUS(createPostDto.uploaderId, createPostDto.spaceId, false))){
        console.log('Not in space.')
      }
      else if (createPostDto.isnotify
        && (createPostDto.uploaderId != space.adminId)) {
        console.log('Only admin can post notify.')
      }
      else if (!createPostDto.isnotify
        && (createPostDto.uploaderId == space.adminId) ) {
        console.log('Admin can post only notify.')
      }
      else {
        const user = await this.userService.findOne(createPostDto.uploaderId)
        if (!user) { console.log('Invalid user') }
        else { return this.postService.create(user, space, createPostDto); }
      }
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.findAll();
  }
  // get all posts by space id.
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.findOne(+id);
  }

  @Get('space/:id')
  findBySpace(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.spaceService.findBySpace(+id);
  }

  @Get('space/:id/notify/:bool')
  findQuestionBySpace(@Param('id') id: string, @Param('bool') bool: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    if (+bool) {
      return this.spaceService.findNotifyBySpace(+id); 
    }
    else {
      return this.spaceService.findQuestionBySpace(+id); 
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':postId/user/:userId')
  async remove(@Param('postId') postId: string, @Param('userId') userId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.remove(+postId, +userId)
  }

  @Delete(':id')
  async removeForce(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.removeForce(+id)
  }

  @Get('restore/:postId/user/:userId')
  async restore(@Param('postId') postId: string, @Param('userId') userId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.postService.restore(+postId, +userId)
  }

}
