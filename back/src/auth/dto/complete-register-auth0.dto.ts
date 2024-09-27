import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteRegisterAuth0Dto {
  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'example@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'ID de la cuenta de Auth0',
    example: '12345678901234567890',
    type: String,
  })
  @IsString()
  providerAccountId: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // @ApiProperty({
  //   description: 'Confirmación de la contraseña del usuario',
  //   example: 'Password123*',
  //   type: String,
  // })
  // @IsNotEmpty()
  // @IsString()
  // @Length(8, 15)
  // confirmPassword: string;

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
    example: '555-555-5555',
    type: String,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}
