import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { DataSource, Repository } from 'typeorm'

@Injectable()
export class OrdersRepository extends Repository<Order> {
  constructor(private readonly dSource: DataSource) {
    super(Order, dSource.getRepository(Order).manager)
  }
}
