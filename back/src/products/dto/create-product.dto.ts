import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Titulo del producto',
    example: 'Anuncio del evento de parroquia san marcos de calamuchita',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example:
      'Descripción del evento de parroquia san marcos de calamuchita que se realizará con el Movimiento Juvenil Peregrinos ',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Imagen del proyecto',
    example: 'https://www.google.com',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Precio del proyecto',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Stock del proyecto',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
