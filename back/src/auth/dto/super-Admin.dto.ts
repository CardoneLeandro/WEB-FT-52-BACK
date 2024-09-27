import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Auth0LogInDto } from './auth0-login.dto'; // Asegúrate de que este sea el path correcto del Auth0LogInDto

export class SuperAdminDto extends PartialType(Auth0LogInDto) {
  @ApiProperty({
    description: 'Rol asignado al usuario SuperAdmin',
    example: 'superadmin',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  role: string;
}
