import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLeaveEventDto {
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

  @IsNotEmpty()
  @IsString()
  eventAddress: string;
}
