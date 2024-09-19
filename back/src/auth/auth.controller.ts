import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() CreateUserData: CreateUserDto) {
    try {
      console.log(
        'CARDONE => authController, signup, CreateUserData ',
        CreateUserData,
      );
      const user = await this.authService.createNewUser(CreateUserData);
      console.log('CARDONE => authController, signup, user ', user);
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.authService.login(loginUserDto);
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
