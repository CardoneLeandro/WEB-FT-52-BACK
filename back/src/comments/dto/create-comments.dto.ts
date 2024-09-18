import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentsDto {
  @ApiProperty({
    description: 'Contenido del comentario',
    example: 'Contenido del comentario',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(140)
  content: string;
}
