import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderDetail } from './entities/order-detail.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class OrderDetailsRepository extends Repository<OrderDetail> {
  constructor(private readonly dSource: DataSource) {
    super(OrderDetail, dSource.getRepository(OrderDetail).manager)
  }
}
