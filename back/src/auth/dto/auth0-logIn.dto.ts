import { IsEmail, IsOptional, IsString, isURL, IsUrl } from 'class-validator';

export class Auth0LogInDto {
  @IsString()
  providerAccountId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  //@IsUrl()
  //@isURL()
  image: string;
}
