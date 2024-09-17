import { Injectable } from '@nestjs/common';
import { CreateUserInformationDto } from './dto/create-user-information.dto';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';

@Injectable()
export class UserInformationService {
  create(createUserInformationDto: CreateUserInformationDto) {
    return 'This action adds a new userInformation';
  }

  findAll() {
    return `This action returns all userInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userInformation`;
  }

  update(id: number, updateUserInformationDto: UpdateUserInformationDto) {
    return `This action updates a #${id} userInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userInformation`;
  }
}
