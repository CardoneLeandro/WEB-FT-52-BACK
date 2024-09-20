import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';
import { UserInformation } from 'src/user-information/entities/user-information.entity';

export class CreatePostDto {
  @ApiProperty({
    description: 'ID del usuario que sube el post',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    type: String,
  })
  @IsNotEmpty()
  creator: string;

  @ApiProperty({
    description: 'Titulo del post',
    example: 'Misa de la Congregación',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'Descripción del post',
    example: 'La misa se realizará festejando la eucaristía en memoria a...',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Imagen del post',
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  image: string;
}
