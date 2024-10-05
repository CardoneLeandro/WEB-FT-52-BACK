import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UsePipes,
  BadRequestException,
  UseGuards,
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
}
