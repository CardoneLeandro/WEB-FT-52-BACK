import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComentsService } from './coments.service';
import { CreateComentDto } from './dto/create-coment.dto';
import { UpdateComentDto } from './dto/update-coment.dto';

@Controller('coments')
export class ComentsController {
  constructor(private readonly comentsService: ComentsService) {}

  @Post()
  create(@Body() createComentDto: CreateComentDto) {
    return this.comentsService.create(createComentDto);
  }

  @Get()
  findAll() {
    return this.comentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComentDto: UpdateComentDto) {
    return this.comentsService.update(+id, updateComentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comentsService.remove(+id);
  }
}
