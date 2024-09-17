import { PartialType } from '@nestjs/mapped-types';
import { CreateComentDto } from './create-coment.dto';

export class UpdateComentDto extends PartialType(CreateComentDto) {}
