import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { getRepository } from 'typeorm';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly postService: PostService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {

    const post = this.postService.findOne(createChatDto.postId)
    const commenter = this.userService.findOne(createChatDto.commenterId)

    if (!(await post) || !(await commenter)) { console.log('Invalid post or user') }
    else { return this.chatService.create(await post, await commenter, createChatDto); }    
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':chatId/user/:userId')
  async remove(@Param('chatId') chatId: string, @Param('userId') userId: string) {
    this.chatService.remove(+chatId, +userId)
  }
}
