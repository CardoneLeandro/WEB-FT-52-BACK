import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentCredentialsService } from './payment-credentials.service';
import { CreatePaymentCredentialDto } from './dto/create-payment-credential.dto';
import { UpdatePaymentCredentialDto } from './dto/update-payment-credential.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment-credentials')
@Controller('payment-credentials')
export class PaymentCredentialsController {
  constructor(private readonly paymentCredentialsService: PaymentCredentialsService) {}

  @Post()
  create(@Body() createPaymentCredentialDto: CreatePaymentCredentialDto) {
    return this.paymentCredentialsService.create(createPaymentCredentialDto);
  }

  @Get()
  findAll() {
    return this.paymentCredentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentCredentialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentCredentialDto: UpdatePaymentCredentialDto) {
    return this.paymentCredentialsService.update(+id, updatePaymentCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentCredentialsService.remove(+id);
  }
}
