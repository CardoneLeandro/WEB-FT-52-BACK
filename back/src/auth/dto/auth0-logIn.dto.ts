import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, isURL, IsUrl } from 'class-validator';

export class Auth0LogInDto {
  @ApiProperty({
    description: 'Id provisto por Auth0 de la cuenta a loguear',
    example: '102036134540783805687',
    type: String,
  })
  @IsString()
  providerAccountId: string;

  @ApiProperty({
    description: 'Email de la cuenta de Auth0 a loguear',
    example: 'tomascampellone@gmail.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nombre de usuario de google de la cuenta de Auth0 a loguear',
    example: 'Fernando Campellone',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Url de la imagen de perfil del usuario correspondiente a la cuenta de google',
    example:
      'https://static.wikia.nocookie.net/wowpedia/images/5/50/Priest_Crest.png/revision/latest?cb=20151110144724',
    type: String,
  })
  @IsOptional()
  @IsString()
  //@IsUrl()
  //@isURL()
  image: string;
}
