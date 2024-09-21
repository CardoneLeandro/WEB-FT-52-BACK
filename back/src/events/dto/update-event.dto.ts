import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends OmitType(PartialType(CreateEventDto), [
  'creator',
] as const) {}
