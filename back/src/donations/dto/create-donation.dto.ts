import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, isUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateDonationDto {
  @ApiProperty({
    description: 'Id de la tabla de información del creador de la donación',
    example: 'd416e835-9c5d-455d-ba12-75700e1f8c98',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  creator: UUID;

  @ApiProperty({
    description: 'Título de la donación de la donación',
    example: 'Donación para ayudar con la reparación de la capilla',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Monto total de la donación',
    example: 20000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
