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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { ParseEventDataInterceptor } from 'src/security/interceptors/parse-event-data.interceptor';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

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
    console.log(eventResponse);
    return eventResponse;
  }

  @Get('getone/:id')
  @ApiOperation({ summary: 'Ruta para la obtención de un evento por su ID' })
  async findOne(@Query('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @Post('updateattendance/:id')
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

  @Patch('highlight/:id')
  @ApiOperation({
    summary:
      'Ruta para cambiar el estado "highlight" de un evento. Pasa de false a true o viceversa',
  })
  async highlights(@Param('id', new IsUUIDPipe()) id: string) {
    try {
      return await this.eventsService.highlight(id);
    } catch (error) {
      throw new HttpException(error.message, 405);
    }
  }
}
