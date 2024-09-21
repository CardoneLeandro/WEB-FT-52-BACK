import { Injectable } from '@nestjs/common';
import { Event } from './entity/events.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsRepository extends Repository<Event> {
  constructor(private readonly dSource: DataSource) {
    super(Event, dSource.getRepository(Event).manager);
  }

  async findAndCountProducts(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ) {
    return await this.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        [sortBy]: order,
      },
    });
  }

  createEvent(event) {
    return this.create(event);
  }

  async saveEvent(event) {
    return await this.save(event);
  }

  async findEventById(id: string) {
    return await this.findOneBy({id});
  }

  async updateEvent(id: string, updateEventData: UpdateEventDto) {
    await this.update(id, updateEventData);
    return await this.findOne({ where: { id } });
  }
}