import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService,) {}

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get('user/:userId/chat/:commentId')
  pressButton(@Param('userId') userId: string, @Param('commentId') commentId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.likeService.pressButton(+userId, +commentId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.likeService.findByUser(+userId);
  }

  @Get('chat/:commentId')
  findByChat(@Param('commentId') commentId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.likeService.findByChat(+commentId);
  }

  @Get('chat/:commentId/count')
  findCountOfChat(@Param('commentId') commentId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.likeService.findCountOfChat(+commentId);
  }
}
