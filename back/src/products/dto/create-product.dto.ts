import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductDto {
  @ApiProperty({
    description: 'ID del usuario que sube el producto',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  creator: UUID;

  @ApiProperty({
    description: 'Titulo del producto',
    example: 'Rosario',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Rosario de Movimiento Juvenil Peregrinos ',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Imagen del producto',
    example: 'https://www.google.com',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Stock del producto',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
