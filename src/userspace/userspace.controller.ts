import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { getRepository } from 'typeorm';
import { Userspace } from './entities/userspace.entity';

@Controller('userspace')
export class UserspaceController {
  constructor(private readonly userspaceService: UserspaceService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService) {}

  @Post()
  async create(@Body() createUserspaceDto: CreateUserspaceDto) {
    const user = this.userService.findOne(createUserspaceDto.userId)
    const space = this.spaceService.findOne(createUserspaceDto.spaceId)

    if (!(await user) || !(await space)) { console.log('Invalid user, space') }
    else { 
      createUserspaceDto.user = await user;
      createUserspaceDto.space = await space;
      return this.userspaceService.create(createUserspaceDto)
    }
  }

  @Get()
  findAll() {
    return this.userspaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userspaceService.findOne(+id);
  }
  // check user id, and space id valid, and delete userspace.
  @Delete(':ids')
  async remove(@Param('ids') ids: string) {

    const ids_ = ids.split('|')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      const info = await getRepository(Userspace)
        .createQueryBuilder('userspace')
        .leftJoinAndSelect('userspace.space', 'space')
        .where('userspace.userId = :userId', { userId : +ids_[0] })
        .where('userspace.spaceId = :spaceId', { spaceId : +ids_[1] })
        .getOne()

      if (!info) { console.log('There is no user&space relationship.') }
      else { 
        if (info.space.adminId == info.userId) { return this.spaceService.remove(info.spaceId) }
        else { return this.userspaceService.remove(info.id) }
      }
    }
  }
}
