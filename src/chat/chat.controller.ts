import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly postService: PostService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }

    const post = await this.postService.findOne(createChatDto.postId)
    const commenter = await this.userService.findOne(createChatDto.commenterId)

    if (!post || !commenter) { console.log('Invalid post or user') }
    else { return this.chatService.create(post, commenter, createChatDto); }    
  }

  @Get()
  findAll(@Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':chatId/user/:userId')
  async remove(@Param('chatId') chatId: string, @Param('userId') userId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    this.chatService.remove(+chatId, +userId)
  }
}
