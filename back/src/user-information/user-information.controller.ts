import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserInformationService } from './user-information.service';
import { CreateUserInformationDto } from './dto/create-user-information.dto';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';

@Controller('user-information')
export class UserInformationController {
  constructor(private readonly userInformationService: UserInformationService) {}

  @Post()
  create(@Body() createUserInformationDto: CreateUserInformationDto) {
    return this.userInformationService.create(createUserInformationDto);
  }

  @Get()
  findAll() {
    return this.userInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserInformationDto: UpdateUserInformationDto) {
    return this.userInformationService.update(+id, updateUserInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userInformationService.remove(+id);
  }
}
