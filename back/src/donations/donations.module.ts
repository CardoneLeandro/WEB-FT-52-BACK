import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
