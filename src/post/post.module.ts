import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Space } from 'src/space/entities/space.entity';
import { SpaceService } from 'src/space/space.service';
import { Userspace } from 'src/userspace/entities/userspace.entity';
import { UserspaceService } from 'src/userspace/userspace.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post , User, Space, Userspace])],
  controllers: [PostController],
  providers: [PostService, UserService, SpaceService, UserspaceService]
})
export class PostModule {}
