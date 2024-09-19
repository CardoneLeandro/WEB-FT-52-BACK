import { Module } from '@nestjs/common'
import { PaymentCredentialsService } from './payment-credentials.service'
import { PaymentCredentialsController } from './payment-credentials.controller'
import { PaymentCredentialsRepository } from './payment-credentials.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentCredential } from './entities/payment-credential.entity'

@Module({
  controllers: [PaymentCredentialsController],
  providers: [PaymentCredentialsService, PaymentCredentialsRepository],
  imports: [TypeOrmModule.forFeature([PaymentCredential])],
})
export class PaymentCredentialsModule {}
