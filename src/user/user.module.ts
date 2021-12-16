import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Space } from 'src/space/entities/space.entity';
import { Post } from 'src/post/entities/post.entity';
import { Chat } from 'src/chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Space, Post, Chat])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
