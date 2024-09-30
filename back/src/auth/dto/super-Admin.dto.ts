import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Auth0LogInDto } from './auth0-login.dto'; // Asegúrate de que este sea el path correcto del Auth0LogInDto

export class SuperAdminDto extends PartialType(Auth0LogInDto) {
  @ApiProperty({
    description: 'Nombre del SuperAdmin',
    example: 'Super Admin',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del SuperAdmin',
    example: 'superadmin@example.com',
    type: String,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'ID de la cuenta de proveedor (Auth0, Google, etc.)',
    example: 'auth0|1234567890',
    type: String,
  })
  @IsString()
  providerAccountId: string;

  @ApiProperty({
    description: 'URL de la imagen de perfil del SuperAdmin',
    example: 'https://example.com/profile.jpg',
    type: String,
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Rol asignado al usuario SuperAdmin',
    example: 'superadmin',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({
    description: 'Estado del SuperAdmin (activo/inactivo)',
    example: 'active',
    type: String,
  })
  @IsString()
  status: string;
}