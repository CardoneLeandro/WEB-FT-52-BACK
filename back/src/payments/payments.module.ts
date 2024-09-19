import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { PaymentsRepository } from './payments.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment } from './entities/payment.entity'

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
  imports: [TypeOrmModule.forFeature([Payment])],
})
export class PaymentsModule {}
