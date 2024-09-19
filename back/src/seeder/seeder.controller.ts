import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeederService } from './seeder.service';
import { CreateSeederDto } from './dto/create-seeder.dto';
import { UpdateSeederDto } from './dto/update-seeder.dto';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  create(@Body() createSeederDto: CreateSeederDto) {
    return this.seederService.create(createSeederDto);
  }

  @Get()
  findAll() {
    return this.seederService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seederService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeederDto: UpdateSeederDto) {
    return this.seederService.update(+id, updateSeederDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seederService.remove(+id);
  }
}
