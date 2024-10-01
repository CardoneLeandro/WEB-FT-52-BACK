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
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth0LogInDto } from './dto/auth0-logIn.dto';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { addJWTInterceptor } from 'src/security/interceptors/addJWT.interceptor';
import { RemovePropertiesInterceptor } from 'src/security/interceptors/remove-properties.interceptor';
import { SignUpDto } from './dto/signUp-user.dto';
import { CompleteRegisterAuth0Dto } from './dto/complete-register-auth0.dto';
import { CompareAndRemovePasswordInterceptor } from 'src/security/interceptors/compare&remove-password.interceptor';
import { StringToNumberInterceptor } from 'src/security/interceptors/string-toNumber.interceptor';
import { status } from 'src/common/enum/status.enum';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth0/signup')
  @ApiOperation({
    summary: 'Ruta para el SignUp con cuentas de Google usando Auth0',
  })
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UsePipes(new DTOValidationPipe())
  async signup(@Body() auth0Data: Auth0LogInDto) {
    try {
      return await this.authService.logginWithAuth0(auth0Data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth0/completeregister')
  @ApiOperation({
    summary:
      'Ruta para completar los datos del usuario una vez que se haya registrado con Google usando Auth0',
  })
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
  @ApiOperation({
    summary: 'Ruta para el SignUp usando el formulario dado por la aplicación',
  })
  @UsePipes(new DTOValidationPipe())
  @UseGuards()
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UseInterceptors(CompareAndRemovePasswordInterceptor)
  async signupUser(@Body() signUpData: SignUpDto) {
    try {
      const params = { status: status.PARTIALACTIVE, ...signUpData };
      return await this.authService.createNewUser(params);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  @ApiOperation({
    summary:
      'Ruta para el LogIn usando los datos dado por el formulario de la aplicación',
  })
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UsePipes(new DTOValidationPipe())
  async login(@Body() loginUserData: LoginUserDto): Promise<any> {
    try {
      return await this.authService.loginUser(loginUserData);
    } catch (e) {
      throw new BadRequestException({ 'ERROR:': `${e.message}` });
    }
  }

  @Patch('ban/:id')
  @ApiOperation({
    summary:
      'Ruta para banear usuarios. Pasa su estado "Active" a "Banned" y viceversa',
  })
  async ban(@Param('id') id: string) {
    return await this.authService.ban(id);
  }

  @Post('get/one/user')
  async getUser(@Query('id') id: string) {
    return await this.authService.getOne(id);
  }
}
