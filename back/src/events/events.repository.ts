import { Injectable } from '@nestjs/common';
import { Event } from './entity/events.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateEventDto } from './dto/update-event.dto';
import { status } from 'src/common/enum/status.enum';

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
    month: string,
    year: number,
    title: string,
  ) {
    const query = this.createQueryBuilder('event')
      .where('event.status = :status', { status: status.ACTIVE })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(`event.${sortBy}`, order);

    if (title) {
      query.andWhere('event.title ILIKE :title', { title: `%${title}%` });
    }

    if (month !== 'all') {
      query.andWhere('EXTRACT(MONTH FROM event.eventDate) = :month', {
        month: Number(month),
      });
    }

    if (year) {
      query.andWhere('EXTRACT(YEAR FROM event.eventDate) = :year', { year });
    }

    return await query.getManyAndCount();
  }

  async findHighlightActive() {
    return await this.find({
      where: {
        status: status.ACTIVE,
        highlight: true,
      },
    });
  }

  async findHighlightInactive() {
    return await this.find({
      where: {
        status: status.INACTIVE,
        highlight: true,
      },
    });
  }

  createEvent(event) {
    const currentDate = new Date()
    const eventDate = new Date(event.eventDate);
    
    if (currentDate > eventDate){
      event.status = status.INACTIVE
    } else {
      event.status = status.ACTIVE
    }
    return this.create(event);
  }

  async saveEvent(event) {
    return await this.save(event);
  }

  async findEventById(id: string) {
    return await this.findOneBy({ id });
  }

  async highlightEvent(id, value) {
    await this.update(id, { highlight: value });
    return await this.findOne({ where: { id } });
  }

  async updateEvent(id: string, params: UpdateEventDto) {
    await this.update(id, params);
    return await this.findOne({ where: { id } });
  }

  async switchEventStatus(id: string, updatedEvent) {
    if (updatedEvent.status === status.ACTIVE) {
      updatedEvent.status = status.INACTIVE;
      await this.update(id, updatedEvent);
    } else if (updatedEvent.status === status.INACTIVE) {
      updatedEvent.status = status.ACTIVE;
      await this.update(id, updatedEvent);
    }
    return await this.findOneBy({ id });
  }
}
