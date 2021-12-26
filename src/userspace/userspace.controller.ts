import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UserService } from 'src/user/user.service';
import { SpaceService } from 'src/space/space.service';
import { getRepository } from 'typeorm';
import { Userspace } from './entities/userspace.entity';
import { Request } from 'express';

@Controller('userspace')
export class UserspaceController {
  constructor(private readonly userspaceService: UserspaceService,
    private readonly userService: UserService,
    private readonly spaceService: SpaceService) {}

  @Post()
  async create(@Body() createUserspaceDto: CreateUserspaceDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const user = await this.userService.findOne(createUserspaceDto.userId)
    const space = await this.spaceService.findOne(createUserspaceDto.spaceId)

    if (!user || !space) { console.log('Invalid user, space') }
    else { 
      createUserspaceDto.user = user;
      createUserspaceDto.space = space;
      return this.userspaceService.create(createUserspaceDto)
    }
  }

  @Get()
  findAll(@Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userspaceService.findAll();
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userspaceService.findByUser(+id)
  }

  @Get('space/:id')
  findBySpace(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userspaceService.findBySpace(+id);
  }

  // check user id, and space id valid, and delete userspace.
  @Delete('user/:userId/space/:spaceId')
  async remove(@Param('userid') userId: string, @Param('spaceId') spaceId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const info = await getRepository(Userspace)
      .createQueryBuilder('userspace')
      .leftJoinAndSelect('userspace.space', 'space')
      .where('userspace.userId = :userId', { userId : +userId })
      .where('userspace.spaceId = :spaceId', { spaceId : +spaceId })
      .getOne()

    if (!info) { console.log('There is no user&space relationship.') }
    else { 
      if (info.space.adminId == info.userId) { return this.spaceService.removeForce(info.spaceId) }
      else { return this.userspaceService.remove(info.id) }
    }
  }
}
