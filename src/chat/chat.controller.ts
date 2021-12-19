import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {
    const ids_ = ids.split('/')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      const post = this.chatService.findOne(+ids_[0])
      if (!(await post)) console.log('Cannot find chat')
      else {
        return this.chatService.remove(+ids)
      }
    }
    // return this.chatService.remove(+id);
  }
}
