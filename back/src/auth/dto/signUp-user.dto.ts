import { IsNotEmpty, IsString, IsEmail, IsNumber} from 'class-validator';
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

  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan Pérez',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 1234567890,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Calle Falsa 123',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
