import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('create')
  createDonation(@Body() donationData) {
    return this.donationsService.createDonation(donationData);
  }

  @Post('webhook')
  async webhook(@Body() event) {
    const eventData = event.body;
    if (eventData.action === 'payment') {
      const paymentData = eventData.data;
      // Procesa la donación aquí
      await this.donationsService.processDonation(paymentData);
    }
    return { message: 'Webhook recibido' };
  }

  @Post('savedonations')
  uploadDonation(@Body() donation) {
    console.log(donation)
    return console.log(donation);
  }

}
