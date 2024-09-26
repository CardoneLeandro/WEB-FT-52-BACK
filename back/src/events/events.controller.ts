import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  UsePipes,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { UUID } from 'crypto';
import { IsUUIDPipe } from 'src/common/pipes/isUUID.pipe';
import { ExistingEventGuard } from 'src/security/guards/existing-event.guard';
import { EventsRepository } from './events.repository';
import { ParseEventDataInterceptor } from 'src/security/interceptors/parse-event-data.interceptor';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventRepo: EventsRepository,
  ) {}

  @Post()
  @UseInterceptors(ParseEventDataInterceptor)
  @UsePipes(new DTOValidationPipe())
  async create(@Body() createEventDto: CreateEventDto) {
    try {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      return await this.eventsService.create(createEventDto);
    } catch (error) {
      throw new HttpException(error.message, 405);
    }
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 9,
    @Query('sortBy') sortBy: string = 'createDate', // Campo de ordenamiento
    @Query('order') order: 'ASC' | 'DESC' = 'DESC', // Dirección de orden
  ) {
    const { events, ...pageInfo } = await this.eventsService.findAll(
      page,
      limit,
      sortBy,
      order,
    );
    const response = { events, page: pageInfo };
    return response;
  }

  @Get('getone')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @Patch('highlight/:id')
  async highlights(@Param('id', new IsUUIDPipe()) id: string) {
    try {
      return await this.eventsService.highlight(id);
    } catch (error) {
      throw new HttpException(error.message, 405);
    }
  }

  @Patch(':id')
  updateEvent(
    @Param('id') id: string,
    @Body() updateEventData: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(id, updateEventData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
