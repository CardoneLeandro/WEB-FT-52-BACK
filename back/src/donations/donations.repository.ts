import { Injectable } from '@nestjs/common';
import { Donation } from './entities/donation.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DonationsRepository extends Repository<Donation> {
  constructor(private readonly dSource: DataSource) {
    super(Donation, dSource.getRepository(Donation).manager);
  }

  async getDonations(){
    const donations = await this.find()
    console.log('Donations:', donations);
   return donations
  }
}
