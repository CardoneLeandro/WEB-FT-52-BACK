import { Module } from '@nestjs/common';
import { UserInformationService } from './user-information.service';
import { UserInformationController } from './user-information.controller';

@Module({
  controllers: [UserInformationController],
  providers: [UserInformationService],
})
export class UserInformationModule {}
