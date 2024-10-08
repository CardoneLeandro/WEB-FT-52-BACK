import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UsePipes,
  BadRequestException,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { status } from 'src/common/enum/status.enum';
import { addJWTInterceptor } from 'src/security/interceptors/addJWT.interceptor';
import { RemovePropertiesInterceptor } from 'src/security/interceptors/remove-properties.interceptor';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { Auth0LogInDto } from 'src/auth/dto/auth0-logIn.dto';
import { CompareAndRemovePasswordInterceptor } from 'src/security/interceptors/compare&remove-password.interceptor';
import { StringToNumberInterceptor } from 'src/security/interceptors/string-toNumber.interceptor';
import { CompleteRegisterAuth0Dto } from 'src/auth/dto/complete-register-auth0.dto';
import { SignUpDto } from 'src/auth/dto/signUp-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthHeaderGuard } from 'src/security/guards/auth-headers.guard';
import { GenerateNewPasswordFromParamsInterceptor } from 'src/security/interceptors/generate-password-from-params.interceptor';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth0/signup')
  @ApiOperation({
    summary: 'Ruta para el SignUp con cuentas de Google usando Auth0',
  })
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UsePipes(new DTOValidationPipe())
  async signup(@Body() auth0Data: Auth0LogInDto) {
    try {
      return await this.usersService.logginWithAuth0(auth0Data);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(AuthHeaderGuard)
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
  async completeRegister(@Body() params: CompleteRegisterAuth0Dto) {
    try {
      return await this.usersService.completeRegister(params);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth/signup')
  @ApiOperation({
    summary: 'Ruta para el SignUp usando el formulario dado por la aplicación',
  })
  @UsePipes(new DTOValidationPipe())
  @UseGuards()
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UseInterceptors(
    CompareAndRemovePasswordInterceptor,
    StringToNumberInterceptor,
  )
  async signupUser(@Body() params: SignUpDto) {
    try {
      const parseParams = { status: status.PARTIALACTIVE, ...params };
      return await this.usersService.createNewUser(parseParams);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('auth/login')
  @ApiOperation({
    summary:
      'Ruta para el LogIn usando los datos dado por el formulario de la aplicación',
  })
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  @UsePipes(new DTOValidationPipe())
  async login(@Body() params: LoginUserDto): Promise<any> {
    try {
      return await this.usersService.loginUser(params);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // =================== ELIMINAR LAS RESPUESTAS Y CAMBIARLAS POR OK ===================
  // ingresar el email del usuario que solicita el cambio de contraseña
  // esto debe generar un token y cargarlo en el ususario ademas de retornarlo por email
  @Post('request-new-password/:email')
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async requestNewPassword(@Param('email') email: string) {
    try {
      const request = await this.usersService.requestNewPassword(email);
      return request;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // ingresar el email del usuario que solicita el cambio de contraseña
  // buscar al usuario por email y comparar el token
  // si coincide, cambiar la contraseña

  @UseInterceptors(GenerateNewPasswordFromParamsInterceptor)
  @Post('change-password/:email/:token/:password')
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async changePassword(
    @Param('email') email: string,
    @Param('token') token: string,
    @Param('password') password: string,
    @Body() newPassword,
  ) {
    try {
      const request = await this.usersService.changePassword({
        email,
        token,
        newPassword,
      });
      return request;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
