import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { getConnection } from 'typeorm';
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
  // Version 1, check user id, and space id valid, and delete userspace.
  @Delete(':ids')
  async remove(@Param('ids') ids: string) {

    const ids_ = ids.split('/')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      const user = this.userService.findOne(+ids_[0])
      const space = this.spaceService.findOne(+ids_[1])

      // get userspace id, remove.
      if (!(await user) || !(await space)) { console.log('Invalid user, space') }
      else {
        const userspace = await getConnection()
          .createQueryBuilder()
          .select("userspace")
          .from(Userspace, "userspace")
          .where('userspace.userId = :userId', { userId : (await user).id })
          .where('userspace.spaceId = :spaceId', { spaceId : (await space).id })
          .getOne();
        if (!userspace) { console.log('There is no user&space relationship.') }
        else { return this.userspaceService.remove(userspace.id) }
      }
    }
  }
}
