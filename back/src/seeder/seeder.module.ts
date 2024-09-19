import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';

@Module({
  controllers: [SeederController],
  providers: [SeederService, UsersRepository, UserInformationRepository],
})
export class SeederModule {}
