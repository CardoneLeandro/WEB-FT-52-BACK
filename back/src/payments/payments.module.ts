import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PaymentsRepository } from './payments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DonationsService } from 'src/donations/donations.service';
import { DonationsRepository } from 'src/donations/donations.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsRepository,
    DonationsService,
    DonationsRepository,
    UserInformationRepository,
  ],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
