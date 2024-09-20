import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';

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

  findAll() {
    const events = this.eventRepo.find();
    return events;
  }

  findOne(id) {
    const event = this.eventRepo.findOneBy({ id });
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
