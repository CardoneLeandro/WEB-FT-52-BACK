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
  ParseUUIDPipe,
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
import { UUID } from 'crypto';
import { EventsService } from 'src/events/events.service';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';
import { DonationsService } from 'src/donations/donations.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventService: EventsService,
    private readonly donationService: DonationsService,
  ) {}
  // retornar ok:true como response para recargar y volver a solicitar la lista de usuarios
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

  // consultar por esta ruta! que funcionalidad esta ?
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

  @Get('user/get/all')
  @ApiOperation({
    summary:
      'Ruta para obtener todos los usuarios. Por defecto se devuelve los usuarios ordenados por updateDate de manera Descendente',
  })
  findAll(
    @Query('sortBy') sortBy: string = 'updateDate',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
  ) {
    try {
      return this.authService.getAllUsers(sortBy, order);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // retornar ok:true como response para recargar y volver a solicitar la lista de usuarios
  @Post('users/role/administrator/:id')
  @ApiOperation({
    summary:
      'Ruta para cambiar el rol del usuario. Si es usuario normal, su rol pasa a ser Admin. Si es Admin, su rol pasa a ser User',
  })
  async makeAdmin(@Param('id') id: string) {
    try {
      return await this.authService.roleChangeAdminUser(id);
    } catch (error) {
      error.message = 'This action is not allowed';
    }
  }

  // ruta para editar eventos, retornar ok:true como response
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

  // ruta para destacar eventos, retornar ok:true como response
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

  // CAMBIA EL ESTADO DE UNA DONACION DE PENDING A ACTIVE O REJECTED
  // retornar ok:true como response para recargar y volver a solicitar la lista de donaciones
  @Patch('payment/donation/confirm/:id')
  @ApiOperation({
    summary:
      'Ruta para cambiar el estado de la donación a APPROVED. Se debe enviar el ID de la donación a querer editar por @Param',
  })
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
  @ApiOperation({
    summary:
      'Ruta para cambiar el estado de la donación a REJECTED. Se debe enviar el ID de la donación a querer editar por @Param',
  })
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
