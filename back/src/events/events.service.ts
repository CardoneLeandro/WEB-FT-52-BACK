import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ElementsRepository } from 'src/element/element.repository';
import { elementType } from 'src/common/enum/elementType.enum';

@Injectable()
export class EventsService {
  constructor (private readonly elementRepo: ElementsRepository) {}
    async create(createEventDto: CreateEventDto) {
      const newDate = new Date();
      const newEvent = {...createEventDto, type:elementType.EVENT, createDate: newDate}
      const createdEvent = this.elementRepo.create(newEvent);
      console.log('GAMMA => eventsService, create, createdEvent', createdEvent);
    if(!createdEvent) {throw new Error('Could not create event');}
    const savedEvent = await this.elementRepo.save(createdEvent);
    return savedEvent;
  }

  findAll() {
    const events = this.elementRepo.find();
    return events
  }

  findOne(id) {
    const event = this.elementRepo.findOneBy({id});
    if(!event) {throw new BadRequestException(`Event with id:${id} not found`);}
    return event
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`
  }

  remove(id: number) {
    return `This action removes a #${id} event`
  }
}
