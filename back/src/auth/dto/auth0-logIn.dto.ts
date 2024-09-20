import { IsEmail, IsOptional, IsString, isURL, IsUrl } from 'class-validator';

export class Auth0LogInDto {
  @IsString()
  providerAccountId: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  //@IsUrl()
  //@isURL()
  profilePicture: string;
}
