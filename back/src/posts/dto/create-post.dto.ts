import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreatePostDto {
  @ApiProperty({
    description: 'ID del usuario que sube el post',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  creator: UUID;

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
    type: [String],
  })
  @IsOptional()
  @IsArray()
  image: string[];

  @ApiProperty({
    description: 'Archivo del post',
    example: 'https://www.files-cloud.com/file/1.pdf',
    type: [String],
  })
  @IsOptional()
  @IsUrl()
  file: string[];
}
