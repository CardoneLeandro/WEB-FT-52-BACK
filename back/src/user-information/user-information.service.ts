import { Injectable, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { CreateUserInformationDto } from './dto/create-user-information.dto';
import { UpdateUserInformationDto } from './dto/update-user-information.dto';
import { UserInformationRepository } from './user-information.repository';

@Injectable()
export class UserInformationService {
  constructor(private readonly userInfoRepo: UserInformationRepository) {}

  create(dto: CreateUserInformationDto) {
    console.log(dto);
    return 'This action adds a new userInformation';
  }

  async createUserInformationTable(newUser: CreateUserInformationDto) {
    const createdUserInformationTable = this.userInfoRepo.createTable(
      newUser.id,
    );

    if (!createdUserInformationTable) {
      throw new Error('Could not create userInformationTable');
    }

    const savedUserInfoTable = await this.userInfoRepo.saveTable(
      createdUserInformationTable,
    );

    if (!savedUserInfoTable) {
      throw new Error('Could not save userInformationTable');
    }

    return savedUserInfoTable;
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
