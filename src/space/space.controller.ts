import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, NotFoundException, ConflictException } from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { getRepository } from 'typeorm';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService,
    private readonly userService: UserService) {}

  @Post()
  async create(@Body() createSpaceDto: CreateSpaceDto) {
    const user = this.userService.findOne(createSpaceDto.adminId)
    return this.spaceService.create(await user, createSpaceDto);
  }

  @Get()
  findAll() {
    return this.spaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spaceService.findOne(+id);
  }

  @Get('admin/:id')
  async findByAdmin(@Param('id') id: string) {
    const info = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.adspaces', 'space')
        .where('user.id = :id', { id: id })
        .getOne()
    return info.adspaces
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: string) {
    const info = await getRepository(User)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.spaces', 'space')
        .where('user.id = :id', { id: id })
        .getOne()
    console.log(info.spaces)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spaceService.update(+id, updateSpaceDto);
  }

  @Delete(':ids')
  async remove(@Param('ids') ids: string) {

    const ids_ = ids.split('|')
    if (ids_.length != 2) console.log('Invalid syntax, we need 2 ids.')
    else {
      const space = this.spaceService.findOne(+ids_[0])
      if (!(await space)) { console.log('Cannot find space.') }
      else {
        if ((await space).adminId != +ids_[1]){ console.log('Not admin.') }
        else { return this.spaceService.remove(+ids_[0]) }
      }
    }
  }
}
