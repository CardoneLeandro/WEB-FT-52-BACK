import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEventDto extends OmitType(PartialType(CreateEventDto), [
  'creator',
] as const) {
  @ApiProperty({
    description: 'Titulo del evento a ser actualizado',
    example: 'Misa de la Congregación actualizada',
    type: String,
  })
  title?: string;

  @ApiProperty({
    description: 'Descripción del evento a ser actualizada',
    example: 'Actualización de la descripción del evento...',
    type: String,
  })
  description?: string;

  @ApiProperty({
    description: 'Fecha actualizada del evento',
    example: '2023-01-01T03:00:00.000Z',
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  eventDate?: Date;

  @ApiProperty({
    description: 'Ubicación actualizada del evento',
    example: 'Nueva ubicación actualizada',
    type: String,
  })
  eventLocation?: string;

  @ApiProperty({
    description: 'Precio actualizado del evento',
    example: 1500,
    type: Number,
  })
  price?: number;

  @ApiProperty({
    description: 'Stock actualizado del evento',
    example: 20,
    type: Number,
  })
  stock?: number;

  @ApiProperty({
    description: 'Imágenes actualizadas del evento',
    example: ['https://example.com/new-image.png'],
    type: [String],
  })
  images?: string[];
}
