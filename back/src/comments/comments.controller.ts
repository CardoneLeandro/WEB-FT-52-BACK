import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { commentsService } from './comments.service';
import { CreateCommentsDto } from './dto/create-comments.dto';
import { UpdateCommentsDto } from './dto/update-comments.dto';

@Controller('comments')
export class commentsController {
  constructor(private readonly commentsService: commentsService) {}

  @Post()
  create(@Body() createCommentsDto: CreateCommentsDto) {
    return this.commentsService.create(createCommentsDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentsDto: UpdateCommentsDto) {
    return this.commentsService.update(+id, updateCommentsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
