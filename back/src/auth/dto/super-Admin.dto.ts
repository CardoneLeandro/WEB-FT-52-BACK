import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Auth0LogInDto } from './auth0-logIn.dto';

export class SuperAdminDto extends PartialType(Auth0LogInDto) {
  role: string;
}
