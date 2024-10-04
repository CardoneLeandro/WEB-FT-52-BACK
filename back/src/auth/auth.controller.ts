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
  ParseUUIDPipe,
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
import { UUID } from 'crypto';
import { EventsService } from 'src/events/events.service';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';
import { IsUUID } from 'class-validator';
import { DonationsService } from 'src/donations/donations.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventService: EventsService,
    private readonly donationService: DonationsService,
  ) {}

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
  async completeRegister(@Body() params: CompleteRegisterAuth0Dto) {
    try {
      return await this.authService.completeRegister(params);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('signup')
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
      return await this.authService.createNewUser(parseParams);
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
  async login(@Body() params: LoginUserDto): Promise<any> {
    try {
      return await this.authService.loginUser(params);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('user/ban/:id')
  @ApiOperation({
    summary:
      'Ruta para banear usuarios. Pasa su estado "Active" a "Banned" y viceversa',
  })
  async ban(@Param('id') id: string) {
    try {
      return await this.authService.ban(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('user/get/one/:id')
  @ApiOperation({
    summary:
      'Ruta para obetener los datos de un usuario en específico por el ID',
  })
  async getUser(@Param('id') id: string) {
    try {
      return await this.authService.getOne(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('users/role/administrator/:id')
  async makeAdmin(@Param('id') id: string) {
    try {
      return await this.authService.roleChangeAdminUser(id);
    } catch (error) {
      error.message = 'This action is not allowed';
    }
  }

  @Post('events/edit/:id')
  @UsePipes(new DTOValidationPipe())
  @ApiOperation({
    summary:
      'Ruta para la actualización de eventos. Se debe enviar el ID del evento a querer editar por @Params y los campos a modificar por @Body',
  })
  async editEvent(@Param('id') id: UUID, @Body() params: UpdateEventDto) {
    try {
      return await this.eventService.updateEvent(id, params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('events/highlight/:id')
  @UsePipes(new DTOValidationPipe())
  @ApiOperation({
    summary:
      'Ruta para el Highlight de eventos. Se debe enviar el ID del evento a querer editar por @Params',
  })
  async highlightEvent(@Param('id') id: UUID) {
    try {
      return await this.authService.highlight(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //CAMBIA EL ESTADO DE UNA DONACION DE PENDING A ACTIVE O REJECTED
  @Patch('payment/donation/confirm/:id')
  async cofirmDonation(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.donationService.updateDonation({
        id: id,
        status: status.ACTIVE,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('payment/donation/reject/:id')
  async rejectDonation(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.donationService.updateDonation({
        id: id,
        status: status.REJECTED,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
