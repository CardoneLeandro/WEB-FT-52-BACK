import { Injectable } from '@nestjs/common';
import { UserInformation } from './entities/user-information.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { status } from 'src/common/enum/status.enum';

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

  //retorna al ususario logueado
  //partiendo de la tabla userInformation, de alli se toma al user, y a las donaciones.
  async loggedUser(params) {
    const loggedUser = await this.findOne({
      where: { user: { id: params } },
      relations: { user: true, donations: true, events: true, assistantEvents: true }
    });
    const { id, user, donations, events, assistantEvents } = loggedUser;
    const assistantsConfirmet = assistantEvents.filter((assistant) => assistant.status === status.ACTIVE)
    return { creatorId: id, ...user, donations, events, assistantEvents: assistantsConfirmet};
  }

  async findOneUser(id) {
    const mData = this.manager.connection.getMetadata(UserInformation);
    const allRelation = mData.relations.map(
      (relation) => relation.propertyPath,
    );
    return await this.findOne({
      where: { user: { id } },
      relations: allRelation,
    });
  }
}
