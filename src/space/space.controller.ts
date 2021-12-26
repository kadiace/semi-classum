import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { UserService } from 'src/user/user.service';
import { UserspaceService } from 'src/userspace/userspace.service';
import { Request } from 'express';

@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService,
    private readonly userService: UserService,
    private readonly userspaceService: UserspaceService) {}

  @Post()
  async create(@Body() createSpaceDto: CreateSpaceDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    const user = this.userService.findOne(createSpaceDto.adminId)
    return this.spaceService.create(await user, createSpaceDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.spaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.spaceService.findOne(+id);
  }

  @Get('admin/:id')
  async findByAdmin(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.findByAdmin(+id)
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userspaceService.findByUser(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.spaceService.update(+id, updateSpaceDto);
  }

  @Delete(':spaceId/user/:userId')
  async remove(@Param('spaceId') spaceId: string, @Param('userId') userId: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    this.spaceService.remove(+spaceId, +userId)
  }
}
