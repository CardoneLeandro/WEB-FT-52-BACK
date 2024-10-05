import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
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
    description: 'Localización brindada por google maps en donde se realizará el evento',
    example: 'httpshttps://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  eventLocation: string;

  @ApiProperty({
    description: 'Ubicación donde se realizará el evento',
    example: 'Calle Falsa 123',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  eventAdress: string;

  @ApiProperty({
    description: 'Precio del evento',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Stock del evento',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del evento',
    example: ['https://example.com/image.png'],
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  images: string[];
}
