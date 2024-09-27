import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  UsePipes,
  UseInterceptors,
  UseGuards,
  Res,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth0LogInDto } from './dto/auth0-logIn.dto';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { addJWTInterceptor } from 'src/security/interceptors/addJWT.interceptor';
import { RemovePropertiesInterceptor } from 'src/security/interceptors/remove-properties.interceptor';
import { SingUpDto } from './dto/signUp-user.dto';
import { CompleteRegisterAuth0Dto } from './dto/complete-register-auth0.dto';
import { CompareAndRemovePasswordInterceptor } from 'src/security/interceptors/compare&remove-password.interceptor';
import { ProviderAccountIdEncriptorInterceptor } from 'src/security/interceptors/providerAccID-encriptor.interceptor';
import { StringToNumberInterceptor } from 'src/security/interceptors/string-toNumber.interceptor';
import { status } from 'src/common/enum/status.enum';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //! FLUJO DE CREACION USUARIO E INICIO DE SESION MEDIANTE AUTH0
  //! cuando el usuario se CREA por auth0 inyectar en el payload el status pendign
  //! retornar el satus si es pending para que el front redirecciones al formulario de completar la informacion
  //! guardar el provideracountid como password para el inicio de sesion por auth0

  //* cuando el usuario actualice su formulario, con el token siendo pending pasar a active

  //auth0 => loading sesion => PETICION => "usuario" "pediging?" => formulario

  //intenta iniciar sesion pero con el "password de google", al estar "pending" "enviar alerta de completar formulario"
  // validacion en login por status, si es pending "redirigir al formulario"

  // signup => ingresa el correo de google? => ya exite en base de datos

  // comprobar si existe y estado. si es "pending" => redirigir al formulario

  // token id

  @Post('auth0/signup')
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor) // INTERCEPTORS APLICADOS AL RESPONSE
  @UsePipes(new DTOValidationPipe())
  async signup(@Body() auth0Data: Auth0LogInDto) {
    try {
      const loggedUser = await this.authService.logginWithAuth0(auth0Data);
      const { id, user } = loggedUser;
      return { creatorId: id, ...user };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth0/completeregister')
  @UseInterceptors(
    CompareAndRemovePasswordInterceptor,
    StringToNumberInterceptor,
  ) //INTERCEPTOPS APLICADOS AL REQUEST
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor) // INTERCEPTORS APLICADOS AL RESPONSE
  @UsePipes(new DTOValidationPipe())
  async completeRegister(@Body() confirmData: CompleteRegisterAuth0Dto) {
    try {
      return await this.authService.completeRegister(confirmData);
    } catch (e) {
      throw new BadRequestException({ 'ERROR:': `${e.message}` });
    }
  }

  //! FLUJO DE CREACION USUARIO E INICIO DE SESION MEDIANTE EL FORMULARIO DEL CLIENTE

  @Post('signup')
  @UsePipes(new DTOValidationPipe())
  @UseGuards()
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UseInterceptors(CompareAndRemovePasswordInterceptor)
  async signupUser(@Body() singUpData: SingUpDto) {
    try {
      const params = { status: status.PARTIALACTIVE, ...singUpData };
      const newUser = await this.authService.createNewUser(params);
      const { id, user } = newUser;
      return { creatorId: id, ...user };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UsePipes(new DTOValidationPipe())
  async login(@Body() loginUserData: LoginUserDto): Promise<any> {
    try {
      console.log(
        'entrada al controlador de login, datos de entrada',
        loginUserData,
      );

      const logedUser = await this.authService.loginUser(loginUserData);
      console.log(
        'salida del controlador de login, resultado del llamado al servicio',
        logedUser,
      );
      return logedUser;
    } catch (e) {
      throw new BadRequestException({ 'ERROR:': `${e.message}` });
    }
  }

  @Patch('ban/:id')
  async ban(@Param('id') id: string) {
    return await this.authService.ban(id);
  }
}

/* 
 if (
        !user ||
        (user && (await encriptPasswordCompare(user, loginUserData.password)) === false)
      ) {
        throw new BadRequestException('Invalid credentials');
      } 
 
*/
