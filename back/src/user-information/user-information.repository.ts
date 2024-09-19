import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInformation } from './entities/user-information.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserInformationRepository extends Repository<UserInformation> {
  constructor(private readonly dSource: DataSource) {
    super(UserInformation, dSource.getRepository(UserInformation).manager);
  }

  createTable(id: string) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return this.create({ id: id });
  }

  saveTable(userInformation: UserInformation) {
    return this.save(userInformation);
  }
}
