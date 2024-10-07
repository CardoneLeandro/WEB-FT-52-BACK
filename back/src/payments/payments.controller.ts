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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @Get()
  async getDonations(){
    try {
      return await this.donationsSv.getDonations()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @Post('pay-donations/success')
  @ApiOperation({
    summary:
      'Ruta para guardar una donación que venga desde la página de "success" de Mercado Pago',
  })
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(DonationFormaterInterceptor)
  @UsePipes(new DTOValidationPipe())
  async payDonationSuccess(@Body() params: CreateDonationDto) {
    try {
      const parseParams = { status: status.ACTIVE, ...params };
      return await this.paymentsService.newDonation(parseParams);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('pay-donations/pending')
  @ApiOperation({
    summary:
      'Ruta para guardar una donación que venga desde la página de "pending" de Mercado Pago',
  })
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(DonationFormaterInterceptor)
  @UsePipes(new DTOValidationPipe())
  async payDonationPending(@Body() params: CreateDonationDto) {
    try {
      const parseParams = { status: status.PENDING, ...params };
      return await this.paymentsService.newDonation(parseParams);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
