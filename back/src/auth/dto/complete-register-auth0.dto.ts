import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteRegisterAuth0Dto {
  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'tomascampellone2@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID de la cuenta de Auth0 del usuario',
    example: '102036134540783805687',
    type: String,
  })
  @IsString()
  providerAccountId: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: '123 Calle Falsa, Springfield',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Teléfono de contacto del usuario',
    example: 555-555-5555,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
