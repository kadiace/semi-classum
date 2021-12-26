import { Controller, Get, Post, Body, Patch, Param, Delete, Req, } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.softDelete(+id);
  }

  @Get ('restore/:id')
  restore(@Param('id') id: string, @Req() req: Request) {
    if (process.env.NODE_ENV == 'dev') { console.log( req.method + ' ' + req.url ) }
    return this.userService.restore(+id);
  }
}
