import { Module } from '@nestjs/common'
import { OrderDetailsService } from './order-details.service'
import { OrderDetailsController } from './order-details.controller'
import { OrderDetailsRepository } from './order-details.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderDetail } from './entities/order-detail.entity'

@Module({
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService, OrderDetailsRepository],
  imports: [TypeOrmModule.forFeature([OrderDetail])],
})
export class OrderDetailsModule {}
