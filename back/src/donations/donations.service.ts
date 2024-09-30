import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { DonationsRepository } from './donations.repository';
import { Donation } from './entities/donation.entity';

@Injectable()
export class DonationsService {
constructor(private readonly donationsRepo: DonationsRepository) {}

  async createDonation({creator, title, amount}) {
    const parseParams = {user: creator, title, amount}
    const newDonation = this.donationsRepo.create(parseParams);
    return await this.donationsRepo.save(newDonation);
  }

  create(params){
    return this.createDonation(params)
  }
























  findAll() {
    return `This action returns all donations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }

  update(id: number, updateDonationDto: UpdateDonationDto) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
