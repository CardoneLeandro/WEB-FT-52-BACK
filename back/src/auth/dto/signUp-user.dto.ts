import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario para el registro',
    example: 'usuario@example.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario para el registro',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  address: string;
}
