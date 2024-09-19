import { PartialType } from '@nestjs/mapped-types'
import { CreatePaymentCredentialDto } from './create-payment-credential.dto'

export class UpdatePaymentCredentialDto extends PartialType(
  CreatePaymentCredentialDto,
) {}
