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

@Injectable()
export class PaymentsService {
  constructor (
    private readonly paymentsRepo: PaymentsRepository,
    private readonly donationsSv: DonationsService,
    private readonly userInfoRepo: UserInformationRepository,
    private readonly dSource: DataSource 
  ){}

  async newDonation(params) {
    return await this.dSource.transaction(async (manager)=> {
      const newDonation:Donation | null = await this.donationsSv.createDonation(params);
      const parseParams = {donation:newDonation, user:params.creator, type: elementType.DONATION}
      const newPayment = this.paymentsRepo.create({...parseParams});
      await this.paymentsRepo.savePayment(newPayment, manager);
      return await this.userInfoRepo.findOne({where: {id: params.creator}, relations: ['donations']})
    })

  }

  create(createPaymentDto) {
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
