import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Post])],
  controllers: [ChatController],
  providers: [ChatService, UserService, PostService]
})
export class ChatModule {}
