import { Injectable } from '@nestjs/common';
import { UserInformation } from './entities/user-information.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserInformationRepository extends Repository<UserInformation> {
  constructor(private readonly dSource: DataSource) {
    super(UserInformation, dSource.getRepository(UserInformation).manager);
  }

  async saveTable(
    userInformationTable: UserInformation,
    manager: EntityManager,
  ) {
    return await manager.save(userInformationTable);
  }
}
