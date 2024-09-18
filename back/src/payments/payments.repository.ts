import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentsRepository extends Repository<Payment> {
  constructor(private readonly dSource: DataSource) {
    super(Payment, dSource.getRepository(Payment).manager);
  }
}
