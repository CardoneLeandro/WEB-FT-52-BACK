import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { UUID } from 'crypto';

export class CreateCommentsDto {
  @ApiProperty({
    description: 'ID del usuario que sube el comentario',
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  creator: UUID;

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
