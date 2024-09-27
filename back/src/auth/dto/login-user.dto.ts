import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario para el login',
    example: 'usuario@example.com',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario para el login',
    example: 'Password123*',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password: string;
}
