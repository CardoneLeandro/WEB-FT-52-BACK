import { Module } from '@nestjs/common';
import { UserInformationService } from './user-information.service';
import { UserInformationController } from './user-information.controller';
import { UserInformationRepository } from './user-information.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInformation } from './entities/user-information.entity';

@Module({
  controllers: [UserInformationController],
  providers: [UserInformationService, UserInformationRepository],
  imports: [TypeOrmModule.forFeature([UserInformation])],
  exports: [UserInformationService, UserInformationRepository],
})
export class UserInformationModule {}
