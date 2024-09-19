import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ElementService } from './element.service'

@Controller('element')
export class ElementController {
  constructor(private readonly elementService: ElementService) {}

  @Post()
  create(@Body() createElementDto) {
    return this.elementService.create(createElementDto)
  }

  @Get()
  findAll() {
    return this.elementService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto) {
    return this.elementService.update(+id, updateElementDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementService.remove(+id)
  }
}
