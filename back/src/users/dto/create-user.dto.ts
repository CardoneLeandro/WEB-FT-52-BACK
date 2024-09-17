import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl, Length, Validate } from "class-validator";
import { MatchPassword } from "src/common/decorators/matchPassword.decorator";


export class CreateUserDto {

    @ApiProperty({
        description: 'Nombre del usuario a ser creado',
        example: 'Fernando',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @ApiProperty({
        description: 'Dirección de mail del usuario a ser creado',
        example: 'Fernando@gmail.com',
        type: String,
      })
    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @ApiProperty({
        description: 'Contraseña del usuario a ser creado',
        example: 'Password123*',
        type: String,
      })
      @IsNotEmpty()
      @IsString()
      @Length(8, 15)
      @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols:1
      },{
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
      })
      password: string;
    
      @ApiProperty({
        description: 'Validación de contraseña del usuario a ser creado',
        example: 'Password123*',
        type: String,
      })
      @IsNotEmpty()
      @Validate(MatchPassword, ['password'])
      confirmPassword: string;

      @ApiProperty({
        description: 'Imagen de perfil del usuario a ser creado',
        example: 'https://fotografias.lasexta.com/clipping/cmsimages02/2019/11/14/66C024AF-E20B-49A5-8BC3-A21DD22B96E6/default.jpg',
        type: String,
      })
      @IsNotEmpty()
      @IsUrl()
      profilePicture: string

      @ApiProperty({
        description: 'Fecha de creación del usuario',
        example: '2020-10-10',
        type: Date,
      })
      @IsNotEmpty()
      @IsDate()
      creationDate: Date

      @ApiProperty({
        description: 'Fecha de actualización del perfil del usuario',
        example: '2020-11-25',
        type: Date,
      })
      @IsNotEmpty()
      @IsDate()
      updateDate: Date
}
