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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { DonationsService } from 'src/donations/donations.service';
import { CreateDonationDto } from 'src/donations/dto/create-donation.dto';
import { StringToNumberInterceptor } from 'src/security/interceptors/string-toNumber.interceptor';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { DonationFormaterInterceptor } from 'src/security/interceptors/donation-formater.interceptor';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly donationsSv: DonationsService,
  ) {}

  @Post('pay-donations')
  @UseInterceptors(StringToNumberInterceptor)
  @UseInterceptors(DonationFormaterInterceptor)
  @UsePipes(new DTOValidationPipe())
  async payDonations(@Body() params: CreateDonationDto) {
    return await this.paymentsService.newDonation(params);
  }
  @Post()
  create(@Body() createPaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
