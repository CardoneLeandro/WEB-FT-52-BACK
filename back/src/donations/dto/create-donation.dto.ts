import { UUID } from 'crypto';

export class CreateDonationDto {
  creator: UUID;

  title: string;

  amount: number;
}
