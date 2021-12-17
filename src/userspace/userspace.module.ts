import { Module } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { UserspaceController } from './userspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userspace } from './entities/userspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userspace])],
  controllers: [UserspaceController],
  providers: [UserspaceService]
})
export class UserspaceModule {}
