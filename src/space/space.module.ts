import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { UserspaceService } from 'src/userspace/userspace.service';
import { Userspace } from 'src/userspace/entities/userspace.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Space, User, Userspace])],
  controllers: [SpaceController],
  providers: [SpaceService, UserService, UserspaceService]
})
export class SpaceModule {}
