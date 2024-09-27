import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
@Injectable()
export class DonationsService {
  async createDonation(donationData: CreateDonationDto) {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "1",
            title: 'Donacion a Congregación Juvenil Peregrinos',
            quantity: 1,
            unit_price: donationData.amount
          }],
        }
      })
    preference.sandbox_init_point
  }
}


