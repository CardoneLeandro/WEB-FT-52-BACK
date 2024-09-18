import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateEventDto {
  @ApiProperty({
    description: 'ID del usuario que sube el evento',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  creator: UUID;

  @ApiProperty({
    description: 'Fecha de creación del evento',
    example: '2022-01-01',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  creationDate: Date;

  @ApiProperty({
    description: 'Titulo del evento a ser creado',
    example: 'Misa de la Congregación',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'Descripción del evento a ser creado',
    example: 'La misa se realizará festejando la eucaristía en memoria a...',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Fecha donde se realizará el evento',
    example: '2022-01-01',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  eventDate: Date;

  @ApiProperty({
    description: 'Ubicación donde se realizará el evento',
    example: 'Calle Falsa 123',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'URL de la imagen del evento',
    example: 'https://example.com/image.png',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
