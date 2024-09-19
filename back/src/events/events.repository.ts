import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EventsRepository extends Repository<Event> {
  constructor(private readonly dSource: DataSource) {
    super(Event, dSource.getRepository(Event).manager);
  }
}
