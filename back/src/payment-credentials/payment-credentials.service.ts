import { Injectable } from '@nestjs/common';
import { CreatePaymentCredentialDto } from './dto/create-payment-credential.dto';
import { UpdatePaymentCredentialDto } from './dto/update-payment-credential.dto';

@Injectable()
export class PaymentCredentialsService {
  create(createPaymentCredentialDto: CreatePaymentCredentialDto) {
    return 'This action adds a new paymentCredential';
  }

  findAll() {
    return `This action returns all paymentCredentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentCredential`;
  }

  update(id: number, updatePaymentCredentialDto: UpdatePaymentCredentialDto) {
    return `This action updates a #${id} paymentCredential`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentCredential`;
  }
}
