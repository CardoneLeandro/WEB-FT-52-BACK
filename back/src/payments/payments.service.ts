import { Injectable } from '@nestjs/common';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsRepository } from './payments.repository';
import { DataSource } from 'typeorm';
import { DonationsService } from 'src/donations/donations.service';
import { elementType } from 'src/common/enum/elementType.enum';
import { Donation } from 'src/donations/entities/donation.entity';
import { Payment } from './entities/payment.entity';
import { DonationsRepository } from 'src/donations/donations.repository';
import { UsersRepository } from 'src/users/users.repository';
import { userInfo } from 'os';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { status } from 'src/common/enum/status.enum';
import { create } from 'domain';
import { createDecipheriv } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepo: PaymentsRepository,
    private readonly donationsSv: DonationsService,
    private readonly userInfoRepo: UserInformationRepository,
    private readonly dSource: DataSource,
    private readonly mailerService: MailerService,
    private readonly donationsRepo: DonationsRepository,
  ) {}

  async newDonation(params) {
    return await this.dSource.transaction(async (manager) => {
      const newDonation: Donation | null =
        await this.donationsSv.createDonation(params);
      const parseParams = {
        donation: newDonation,
        user: params.creator,
        type: elementType.DONATION,
      };
      const newPayment = this.paymentsRepo.create({ ...parseParams });
      await this.paymentsRepo.savePayment(newPayment, manager);
      const user = await this.userInfoRepo.findOne({
        where: { id: params.creator },
        relations: { user: true },
      });
      if (params.status === status.ACTIVE) {
        await this.mailerService.sendEmailDonation({
          name: user.user.name,
          email: user.user.email,
          amount: newDonation.amount,
        });
      }
      const createdDonation = await this.donationsRepo.findOne({
        where: { id: newDonation.id },
      });
      return {email: user.user.email, ...createdDonation};
    });
  }
}
