import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { Event } from './entity/events.entity';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { EventAssistantsRepository } from './event-assistants.repository';
import { status } from 'src/common/enum/status.enum';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventRepo: EventsRepository,
    private readonly userInfoRepo: UserInformationRepository,
    private readonly eventAssistantsRepo: EventAssistantsRepository,
    private readonly mailerService: MailerService,
  ) {}

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
    month: string = 'all',
    year: number,
    title: string = '',
  ) {
    const [events, totalElements] = await this.eventRepo.findAndCountProducts(
      page,
      limit,
      sortBy,
      order,
      month,
      year,
      title,
    );
    const validSortFields = ['price', 'createDate', 'title'];
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

  async findHighlightActive(){
    return this.eventRepo.findHighlightActive()
  }

  async findHighlightInactive(){
    return this.eventRepo.findHighlightInactive()
  }

  findOne(id) {
    const event = this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event with id:${id} not found`);
    }
    return event;
  }

  async updateAttendanceStatus(param) {
    const event = await this.eventRepo.findOne({
      where: { id: param.eventId },
      relations: { assistants: true },
    });
    if (!event) throw new BadRequestException(`User or Event not found`);
    if (event.stock !== 0) {
      const assistantsActive = event.assistants.filter(
        (assistant) => assistant.status === status.ACTIVE,
      );
      if (assistantsActive.length >= event.stock)
        throw new BadRequestException(`Event with id:${param.eventId} is full`);
    }
    const user = await this.userInfoRepo.findOne({
      where: { id: param.creator },
      relations: { user: true },
    });
    if (!user) throw new BadRequestException(`User or Event not found`);
    const attendance = await this.eventAssistantsRepo.findOne({
      where: { user: { id: user.id }, event: { id: event.id } },
    });
    if (!attendance) {
      const newEventAttendant = await this.eventAssistantsRepo.create({
        user,
        event,
        eventId: param.eventId,
        status: status.ACTIVE,
      });
      await this.eventAssistantsRepo.save(newEventAttendant);
    } else if (attendance.status === status.ACTIVE) {
      await this.eventAssistantsRepo.update(attendance.id, {
        status: status.INACTIVE,
      });
    } else {
      await this.eventAssistantsRepo.update(attendance.id, {
        status: status.ACTIVE,
      });
    }
    const updatedEvent = await this.eventRepo.findOne({
      where: { id: param.eventId },
      relations: { assistants: true },
    });
    const updateUser = await this.userInfoRepo.loggedUser(user.user.id);
    return { updatedEvent, updateUser };
  }

  async updateEvent(id, params) {
    const foundEvent = await this.eventRepo.findOneBy({ id });
    if (!foundEvent) {
      throw new BadRequestException('Event not found');
    }
    return await this.eventRepo.updateEvent(id, params);
  }

  async highlight(id) {
    const event: Event | null = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event not found`);
    }
    return await this.eventRepo.highlightEvent(id, !event.highlight);
  }

  async switcheventstatus(id){
    return await this.eventRepo.switcheventstatus(id)
  }
}
