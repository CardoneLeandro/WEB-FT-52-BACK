import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';
import { response } from 'express';
import { Event } from './entity/events.entity';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepo: EventsRepository) {}

  async create(eventData) {
    const createdEvent = this.eventRepo.create(eventData);
    if (!createdEvent) {
      throw new Error('Could not create event');
    }
    const savedEvent = await this.eventRepo.save(createdEvent);
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
    const event = this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event with id:${id} not found`);
    }
    return event;
  }

  async updateEvent(id: string, updateEventData: UpdateEventDto) {
    const foundEvent = await this.eventRepo.findOneBy({ id });
    if (!foundEvent) {
      throw new BadRequestException('Event not found');
    }
    const updatedEvent = await this.eventRepo.updateEvent(id, updateEventData);
    return updatedEvent;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }

  async highlight(id) {
    const event: Event | null = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event not found`);
    }
    await this.eventRepo.highlightEvent(id, !event.highlight);
    return { highlight: !event.highlight, ...event };
  }
}
