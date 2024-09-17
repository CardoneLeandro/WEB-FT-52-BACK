import { Module } from '@nestjs/common';
import { PaymentCredentialsService } from './payment-credentials.service';
import { PaymentCredentialsController } from './payment-credentials.controller';

@Module({
  controllers: [PaymentCredentialsController],
  providers: [PaymentCredentialsService],
})
export class PaymentCredentialsModule {}
