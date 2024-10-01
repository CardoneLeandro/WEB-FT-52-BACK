import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { DonationsRepository } from './donations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entities/donation.entity';

@Module({
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository],
  imports: [TypeOrmModule.forFeature([Donation])],
  exports: [DonationsService, DonationsRepository],
})
export class DonationsModule {}
