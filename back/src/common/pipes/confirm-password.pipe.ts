import {
  BadRequestException,
  CanActivate,
  Injectable,
  Next,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@Injectable()
export class ConfirmPasswordPipe implements PipeTransform {
  transform(value: CreateUserDto) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    return Next();
  }
}
