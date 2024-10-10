import { Injectable } from '@nestjs/common';
import { DonationsRepository } from './donations.repository';
import { status } from 'src/common/enum/status.enum';

@Injectable()
export class DonationsService {
  constructor(private readonly donationsRepo: DonationsRepository) {}

  async createDonation({ creator, title, amount, status }) {
    const parseParams = { user: creator, title, amount, status };
    const newDonation = this.donationsRepo.create(parseParams);
    return await this.donationsRepo.save(newDonation);
  }

  async getDonations(){
    const allDonations = await this.donationsRepo.getDonations()
    const formatedDonations = allDonations.map((donation) => {
      const newdate = new Date(donation.date);
        const formattedDate = `${String(newdate.getDate()).padStart(2, '0')}/${String(newdate.getMonth() + 1).padStart(2, '0')}/${newdate.getFullYear()}`;
      const { user, date, ...rest } = donation;
      return {email:user.user.email,date:formattedDate, ...rest};
    }) 
    return formatedDonations
  }

  async updateDonation(params: { id: string; status: status }) {
    const donation = this.donationsRepo.findOneBy({ id: params.id });
    if (!donation) throw new Error('This action is not allowed');
    await this.donationsRepo.update(
      { id: params.id },
      { status: params.status },
    );
    return await this.donationsRepo.findOneBy({ id: params.id });
    //return {ok:true};
  }
}
