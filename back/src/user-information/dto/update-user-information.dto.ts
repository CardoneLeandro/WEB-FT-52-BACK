import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInformationDto } from './create-user-information.dto';

export class UpdateUserInformationDto extends PartialType(CreateUserInformationDto) {}
