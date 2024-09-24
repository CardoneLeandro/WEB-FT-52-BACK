import { IsNotEmpty } from 'class-validator';

export class SingUpDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
