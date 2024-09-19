import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateFileDto {
  @ApiProperty({
    description: 'Titulo del archivo',
    example: 'Foto de Misa 1',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: 'Url del archivo',
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    type: String,
  })
  @IsNotEmpty()
  @IsUrl()
  url: string
}
