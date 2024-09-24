import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UsePipes,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth0LogInDto } from './dto/auth0-logIn.dto';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { addJWTInterceptor } from 'src/security/interceptors/addJWT.interceptor';
import { RemovePropertiesInterceptor } from 'src/security/interceptors/remove-properties.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth0/signup')
  @UsePipes(new DTOValidationPipe())
  @UseInterceptors(addJWTInterceptor, RemovePropertiesInterceptor)
  async signup(@Body() SignUpData: Auth0LogInDto) {
    try {
      const loggedUser = await this.authService.loggedUser(SignUpData);
      const { id, user } = loggedUser;
      console.log('RESPONSE AUTH0 LOGIN', { creatorId: id, ...user });
      return { creatorId: id, ...user };
    } catch (e) {
      throw new BadRequestException({'ERROR:': ` ESTE ES EL ERROR EN EL TESTEO${e.message}`});
    }
  }

  @Post('login')
  async login(@Body() loginUserData: LoginUserDto) {
    console.log('CARDONE =========> loginUserData input value', loginUserData);
    try {
      return await this.authService.loggedUser(loginUserData);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('ban/:id')
  async ban(@Param('id') id: string) {
    return await this.authService.ban(id);
  }
}
