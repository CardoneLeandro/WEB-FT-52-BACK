import { PartialType } from '@nestjs/swagger';
import { CreateInformationDto } from './create-information.dto';

export class UpdateInformationDto extends PartialType(CreateInformationDto) {}
