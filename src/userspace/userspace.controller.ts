import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserspaceService } from './userspace.service';
import { CreateUserspaceDto } from './dto/create-userspace.dto';
import { UpdateUserspaceDto } from './dto/update-userspace.dto';

@Controller('userspace')
export class UserspaceController {
  constructor(private readonly userspaceService: UserspaceService) {}

  @Post()
  create(@Body() createUserspaceDto: CreateUserspaceDto) {
    return this.userspaceService.create(createUserspaceDto);
  }

  @Get()
  findAll() {
    return this.userspaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userspaceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserspaceDto: UpdateUserspaceDto) {
    return this.userspaceService.update(+id, updateUserspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userspaceService.remove(+id);
  }
}
