import { IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

export class CreatePaymentDto {
  @IsNotEmpty()
  user: UUID;

  @IsNotEmpty()
  id: string;
}
