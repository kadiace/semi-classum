import { Module } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { UserspaceController } from './userspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userspace } from './entities/userspace.entity';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { Space } from 'src/space/entities/space.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userspace, User, Space])],
  controllers: [UserspaceController],
  providers: [UserspaceService, UserService, SpaceService]
})
export class UserspaceModule {}
