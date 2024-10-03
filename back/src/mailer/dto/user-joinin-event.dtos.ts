import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserJoininEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @IsNotEmpty()
  @IsString()
  eventLocation: string;
}
