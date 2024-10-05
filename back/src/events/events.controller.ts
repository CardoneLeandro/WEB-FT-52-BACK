import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  HttpException,
  UsePipes,
  UseInterceptors,
  BadRequestException,
  ParseUUIDPipe,
  NotFoundException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { ParseEventDataInterceptor } from 'src/security/interceptors/parse-event-data.interceptor';
import { EventsRepository } from './events.repository';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventRepo: EventsRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Ruta para la creación de eventos' })
  @UseInterceptors(ParseEventDataInterceptor)
  @UsePipes(new DTOValidationPipe())
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      return await this.eventsService.create(createEventDto);
    } catch (error) {
      throw new HttpException(error.message, 405);
    }
  }

  @Get()
  @ApiOperation({
    summary:
      'Ruta para la obtención de todos los eventos creados. Por defecto se devuelve 1 pagina con 9 eventos ordenados por fecha de creación de más reciente a más antiguo',
  })
  @ApiQuery({ name: 'page', required: false, example: 1, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, example: 5, description: 'Cantidad de eventos por página' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'createDate', description: 'Campo por el que se ordenarán los eventos' })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'], example: 'DESC', description: 'Orden de los resultados (ascendente o descendente)' })
  @ApiQuery({ name: 'month', required: false, example: 'all', description: 'Filtrar eventos por mes (Si deseas todos los meses ingresa el Param "all")' })
  @ApiQuery({ name: 'year', required: false, example: 2024, description: 'Filtrar eventos por año' })
  @ApiQuery({ name: 'title', required: false, example: '', description: 'Filtrar eventos por título' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('sortBy') sortBy: string = 'createDate',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('month') month: string = 'all',
    @Query('year') year: number,
    @Query('title') title: string = '',
  ) {
    const eventResponse = await this.eventsService.findAll(
      page,
      limit,
      sortBy,
      order,
      month,
      year,
      title,
    );
    return eventResponse;
  }

  @Get('getone/:id')
  @ApiOperation({ summary: 'Ruta para la obtención de un evento por su ID' })
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @Get('highlightactive')
  @ApiOperation({
    summary:
      'Ruta para la obtención de los eventos cuyo Highlight sea True y su status sea ACTIVE',
  })
  async findHighlightActive() {
    return await this.eventsService.findHighlightActive();
  }

  @Get('highlightinactive')
  @ApiOperation({
    summary:
      'Ruta para la obtención de los eventos cuyo Highlight sea True y su status sea INACTIVE',
  })
  async findHighlightInactive() {
    return await this.eventsService.findHighlightInactive();
  }

  @Post('updateattendance/:id')
  @ApiOperation({
    summary:
      'Ruta para actualizar el estado de asistencia de un usuario a un evento',
  })
  async updateAttendanceStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: any,
  ) {
    try {
      return await this.eventsService.updateAttendanceStatus({
        eventId: id,
        ...user,
      });
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
}
