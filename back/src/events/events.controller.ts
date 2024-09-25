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

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventRepo: EventsRepository,
  ) {}

  @Post()
  @UsePipes(new DTOValidationPipe())
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    @Query('sortBy') sortBy: string = 'createDate', 
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('month') month: string = 'all',
    @Query('year') year: number = new Date().getFullYear(),
    @Query('title') title: string = '',
  ) {
    const eventResponse = await this.eventsService.findAll(page, limit, sortBy, order, month, year, title);
    console.log(eventResponse)
    return eventResponse;
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
