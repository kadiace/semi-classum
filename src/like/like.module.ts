import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserService } from 'src/user/user.service';
import { ChatService } from 'src/chat/chat.service';
import { Like } from './entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Chat])],
  controllers: [LikeController],
  providers: [LikeService, UserService, ChatService]
})
export class LikeModule {}
