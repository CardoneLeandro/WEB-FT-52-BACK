import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { status } from 'src/common/enum/status.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary:
      'Ruta para obtener todos los usuarios. Por defecto se devuelve 1 página con 5 usuarios ordenados por fecha de actualización',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('sortBy') sortBy: string = 'updateDate',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('status') stat: status | 'all' = status.ACTIVE,
  ) {
    return this.usersService.findAll(page, limit, sortBy, order, stat);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ruta caducada momentaneamente' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
