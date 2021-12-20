import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UserService } from 'src/user/user.service';
import { ChatService } from 'src/chat/chat.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly chatService: ChatService) {}

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get('user/:userId/chat/:commentId')
  pressButton(@Param('userId') userId: string, @Param('commentId') commentId: string) {
    return this.likeService.pressButton(+userId, +commentId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.likeService.findByUser(+userId);
  }

  @Get('chat/:commentId')
  findByChat(@Param('commentId') commentId: string) {
    return this.likeService.findByChat(+commentId);
  }

  @Get('chat/:commentId/count')
  findCountOfChat(@Param('commentId') commentId: string) {
    return this.likeService.findCountOfChat(+commentId);
  }

}
