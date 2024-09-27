import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
@Injectable()
export class DonationsService {
  async createDonation(donationData) {
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

  async uploadDonation(donation){

  }

  async processDonation(paymentData) {
    const donation = {
      id: paymentData.id,
      amount: paymentData.transaction_amount,
      message: paymentData.description,
      // Otros datos relevantes
    };
    // Guarda la donación en tu base de datos
    await this.saveDonation(donation);
    // Envia un correo electrónico de confirmación, etc.
  }

  async saveDonation(donation) {
    return console.log(donation);
    
  }
}


