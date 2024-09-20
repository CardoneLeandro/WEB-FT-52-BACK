import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ElementsRepository } from 'src/element/element.repository';
import { elementType } from 'src/common/enum/elementType.enum';
import { EventsRepository } from './events.repository';

@Injectable()
export class EventsService {
  constructor(
    private readonly elementRepo: ElementsRepository,
    private readonly eventRepo: EventsRepository,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const newDate = new Date();
    const newEvent = {
      ...createEventDto,
      type: elementType.EVENT,
      createDate: newDate,
    };
    const createdEvent = this.elementRepo.create(newEvent);
    console.log('GAMMA => eventsService, create, createdEvent', createdEvent);
    if (!createdEvent) {
      throw new Error('Could not create event');
    }
    const savedEvent = await this.elementRepo.save(createdEvent);
    return savedEvent;
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string = 'createDate',
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    const [events, totalElements] = await this.eventRepo.findAndCountProducts(
      page,
      limit,
      sortBy,
      order,
    );
    const validSortFields = ['price', 'title', 'createDate'];
    if (!validSortFields.includes(sortBy)) {
      throw new Error(`Invalid sort field: ${sortBy}`);
    }

    const totalPages = Math.ceil(totalElements / Number(limit));
    const hasPrevPage = Number(page) > 1;
    const hasNextPage = Number(page) < totalPages;
    const prevPage = hasPrevPage ? Number(page) - 1 : null;
    const nextPage = hasNextPage ? Number(page) + 1 : null;

    return {
      events,
      totalElements,
      page,
      limit,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  }

  findOne(id) {
    const event = this.elementRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event with id:${id} not found`);
    }
    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
