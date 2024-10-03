import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseInterceptors,
  UsePipes,
  BadRequestException,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { DonationsService } from 'src/donations/donations.service';
import { CreateDonationDto } from 'src/donations/dto/create-donation.dto';
import { StringToNumberInterceptor } from 'src/security/interceptors/string-toNumber.interceptor';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { DonationFormaterInterceptor } from 'src/security/interceptors/donation-formater.interceptor';
import { status } from 'src/common/enum/status.enum';
@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly donationsSv: DonationsService,
  ) {}

  @Post('pay-donations/success')
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(DonationFormaterInterceptor)
  @UsePipes(new DTOValidationPipe())
  async payDonationSuccess(@Body() params: CreateDonationDto) {
    try {
      const parseParams = {status: status.ACTIVE, ...params}
      return await this.paymentsService.newDonation(params);
    } catch (e) {
      throw new BadRequestException(e.error.message)
    }
  }
  @Post('pay-donations/pending')
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(DonationFormaterInterceptor)
  @UsePipes(new DTOValidationPipe())
  async payDonationPending(@Body() params: CreateDonationDto) {
    try {
      const parseParams = {status: status.PENDING, ...params}
      return await this.paymentsService.newDonation(params);
    } catch (e) {
      throw new BadRequestException(e.error.message)
    }
  }
  
}
