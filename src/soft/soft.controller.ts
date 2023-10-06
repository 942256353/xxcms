import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SoftService } from './soft.service';
import { CreateSoftDto } from './dto/create-soft.dto';
import { UpdateSoftDto } from './dto/update-soft.dto';
import { Auth } from 'src/auth/auth.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { user } from '@prisma/client';
import { Admin } from 'src/auth/admin.decorator';

@Controller('soft')
export class SoftController {
  constructor(private readonly softService: SoftService) {}

  @Post()
  @Admin()
  create(@Body() createSoftDto: CreateSoftDto,@CurrentUser() user:user) {
    return this.softService.create(createSoftDto,user);
  }

  @Get()
  findAll(@Query('page') page: number=1,@Query('row') row: number=10) {
    return this.softService.findAll(+page,+row);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.softService.findOne(+id);
  }

  @Patch(':id')
  @Admin()
  update(@Param('id') id: string, @Body() updateSoftDto: UpdateSoftDto) {
    return this.softService.update(+id, updateSoftDto);
  }

  @Delete(':id')
  @Admin()
  remove(@Param('id') id: string) {
    return this.softService.remove(+id);
  }
}
