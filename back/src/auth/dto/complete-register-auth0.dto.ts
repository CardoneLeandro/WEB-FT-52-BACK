import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CompleteRegisterAuth0Dto {
  @ApiProperty({
    description: 'Dirección de correo electrónico del usuario',
    example: 'example@gmail.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
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
  @IsString()
  phone: string;
}
