import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentCredential } from './entities/payment-credential.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentCredentialsRepository extends Repository<PaymentCredential> {
  constructor(private readonly dSource: DataSource) {
    super(PaymentCredential, dSource.getRepository(PaymentCredential).manager);
  }
}
