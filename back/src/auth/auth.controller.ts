import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  BadRequestException,
  UsePipes,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { status } from 'src/common/enum/status.enum';
import { UUID } from 'crypto';
import { EventsService } from 'src/events/events.service';
import { UpdateEventDto } from 'src/events/dto/update-event.dto';
import { DonationsService } from 'src/donations/donations.service';
import { ParseEventDataInterceptor } from 'src/security/interceptors/parse-event-data.interceptor';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { AuthHeaderGuard } from 'src/security/guards/auth-headers.guard';
import { RolesGuard } from 'src/security/guards/roles.guard';
import { SuperAdminProtectionGuard } from 'src/security/guards/super-admin-protection.guard';
import { SelfProtectionGuard } from 'src/security/guards/self-protection.guard';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';

//
@UseGuards(AuthHeaderGuard, RolesGuard)
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly eventService: EventsService,
    private readonly donationService: DonationsService,
    private readonly postService: PostsService,
    private readonly donationsSv: DonationsService,
    private readonly eventsService: EventsService
  ) {}
  // retornar ok:true como response para recargar y volver a solicitar la lista de usuarios
  @UseGuards(SuperAdminProtectionGuard, SelfProtectionGuard)
  @Patch('user/ban/:id')
  @ApiOperation({
    summary:
      'Ruta para banear usuarios. Pasa su estado "Active" a "Banned" y viceversa',
  })
  async ban(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const user = await this.authService.ban(id);
      return user;
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
  @ApiQuery({
    name: 'sortBy',
    required: false,
    example: 'updateDate',
    description: 'Fecha de la última actualización del usuario',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
    description: 'Orden de los resultados (ascendente o descendente)',
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
  @UseGuards(SuperAdminProtectionGuard, SelfProtectionGuard)
  @Patch('user/role/administrator/:id')
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

  @Get('events/get/all')
  @ApiOperation({ summary: 'Ruta para obtener todos los eventos.' })
  async getAllEvents() {
    try {
      return await this.eventService.getAllEvents();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('events/create')
  @ApiOperation({ summary: 'Ruta para la creación de eventos' })
  @UseInterceptors(ParseEventDataInterceptor)
  @UsePipes(new DTOValidationPipe())
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventService.create(createEventDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  // ruta para editar eventos, retornar ok:true como response
  @Patch('events/edit/:id')
  @UseInterceptors(ParseEventDataInterceptor)
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
  @Patch('events/highlight/:id')
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

  @Post('switcheventstatus/:id')
  @ApiOperation({
    summary:
      'Ruta para cambiar el estado del evento de ACTIVE a INACTIVE y viceversa',
  })
  async switchEventStatus(@Param('id', new IsUUIDPipe()) id: string) {
    try {
      return await this.eventsService.switchEventStatus(id);
    } catch (error) {
      throw new NotFoundException('Could not find the event');
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

  @Get('donations')
  @ApiOperation({
    summary:
      'Ruta para obtener todas las donaciones',
  })
  async getDonations(){
    try {
      return await this.donationsSv.getDonations()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @Post('post/create')
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async createPost(@Body() createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postService.create(createPostDto);
      return newPost;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('post/edit/:id')
  @ApiOperation({
    summary:
      'Work in Progress',
  })
  async editPost(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() params: UpdatePostDto,
  ) {
    try {
      const editPost = await this.postService.updatePost({ id, params });
      return editPost;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
