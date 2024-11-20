import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsRepository } from './events.repository';
import { Event } from './entity/events.entity';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { EventAssistantsRepository } from './event-assistants.repository';
import { status } from 'src/common/enum/status.enum';
import e from 'express';
import { ReturnDocument } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    private readonly eventRepo: EventsRepository,
    private readonly userInfoRepo: UserInformationRepository,
    private readonly eventAssistantsRepo: EventAssistantsRepository,
    private readonly mailerService: MailerService,
  ) {}
  private async getUserEventInfo(userInfo) {
    const assistantEventsActive = await this.eventAssistantsRepo.find({
      where: { user: { id: userInfo.id }, status: status.ACTIVE },
    });

    return {
      id: userInfo.user.id,
      assistantEvents: assistantEventsActive,
    };
  }
  async create(eventData) {
    const currentDate = new Date();
    const eventDate = new Date(eventData.eventDate);

    if (currentDate > eventDate) {
      eventData.status = status.INACTIVE;
    } else {
      eventData.status = status.ACTIVE;
    }

    if (eventData.stock !== 0) {
      eventData.currentStock = eventData.stock;
    } else {
      eventData.currentStock = -1;
    }

    const createdEvent = this.eventRepo.create(eventData);
    if (!createdEvent) {
      throw new Error('Could not create event');
    }
    const savedEvent = await this.eventRepo.save(createdEvent);
    return savedEvent;
  }

  async getAllEvents() {
    return await this.eventRepo.find();
  }

  async getActiveAndInactiveHighlight() {
    return await this.eventRepo.find({
      where: [
        { status: status.ACTIVE },
        { status: status.INACTIVE, highlight: true },
      ],
    });
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
    const validSortFields = ['createDate', 'eventDate', 'title'];
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

  async findHighlightActive() {
    return this.eventRepo.findHighlightActive();
  }

  async findHighlightInactive() {
    return this.eventRepo.findHighlightInactive();
  }

  findOne(id) {
    const event = this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event with id:${id} not found`);
    }
    return event;
  }

  async updateAttendanceStatus(param) {
    console.log('servicio de eventos, funcion de gestion de asistencias');
    const { event, userInfo } = param;

    const mailDto = {
      name: userInfo.user.name,
      email: userInfo.user.email,
      title: event.title,
      eventDate: event.eventDate,
      eventLocation: event.eventLocation,
      eventAddress: event.eventAddress,
    };

    const attendance = await this.eventAssistantsRepo.findOne({
      where: { user: { id: userInfo.id }, event: { id: event.id } },
    });
    console.log('servicio de eventos, turno =>', attendance);

    //? Crea nueva asistencia
    if (!attendance) {
      if (event.vacancy === false) {
        throw new BadRequestException('El evento no tiene cupos disponibles');
      } else {
        const newEventAttendant = this.eventAssistantsRepo.create({
          status: status.ACTIVE,
          eventId: event.id,
          title: event.title,
          eventDate: event.eventDate,
          user: userInfo,
          event: event,
        });
        await this.eventAssistantsRepo.save(newEventAttendant);

        if (event.stock === 0) {
          await this.mailerService.sendMailJoininEvent(mailDto);
          return this.getUserEventInfo(userInfo);
        } else {
          event.currentStock = Math.max(0, event.currentStock - 1);
          event.vacancy = event.currentStock > 0;

          await this.eventRepo.update(event.id, {
            currentStock: event.currentStock,
            vacancy: event.vacancy,
          });

          await this.mailerService.sendMailJoininEvent(mailDto);
          return this.getUserEventInfo(userInfo);
        }
      }
    }

    //? Activar la asistencia
    if (attendance.status === status.INACTIVE) {
      if (event.vacancy === false) {
        throw new BadRequestException('El evento no tiene cupos disponibles');
      } else {
        await this.eventAssistantsRepo.update(attendance.id, {
          status: status.ACTIVE,
        });

        if (event.stock !== 0) {
          event.currentStock = Math.max(0, event.currentStock - 1);
          event.vacancy = event.currentStock > 0;

          await this.eventRepo.update(event.id, {
            currentStock: event.currentStock,
            vacancy: event.vacancy,
          });
        }

        await this.mailerService.sendMailJoininEvent(mailDto);
        return this.getUserEventInfo(userInfo);
      }
    }

    //? Cancelar la asistencia
    if (attendance.status === status.ACTIVE) {
      await this.eventAssistantsRepo.update(attendance.id, {
        status: status.INACTIVE,
      });

      if (event.stock !== 0) {
        event.currentStock = Math.min(event.stock, event.currentStock + 1);
        event.vacancy = true;

        await this.eventRepo.update(event.id, {
          currentStock: event.currentStock,
          vacancy: event.vacancy,
        });
      }

      await this.mailerService.sendMailLeaveEvent(mailDto);
      return this.getUserEventInfo(userInfo);
    }
  }

  async seedAttendance(param) {
    const event = await this.eventRepo.findOne({
      where: { id: param.eventId },
    });
    const userInfo = await this.userInfoRepo.findOne({
      where: { id: param.creator },
    });
    const newEventAttendant = await this.eventAssistantsRepo.create({
      user: userInfo,
      event,
      eventId: param.eventId,
      title: event.title,
      eventDate: event.eventDate,
      status: status.ACTIVE,
    });
    await this.eventAssistantsRepo.save(newEventAttendant);
  }

  async updateEvent(id: string, updateEventData: UpdateEventDto) {
    const foundEvent = await this.eventRepo.findOneBy({ id });
    if (!foundEvent) {
      throw new BadRequestException('Event not found');
    }
    await this.eventRepo.updateEvent(id, updateEventData);

    const dateUpdatedEvent = await this.eventRepo.findOneBy({ id });
    if (updateEventData.eventDate) {
      const currentDate = new Date();
      const eventDate = new Date(dateUpdatedEvent.eventDate);
      if (currentDate > eventDate) {
        dateUpdatedEvent.status = status.INACTIVE;
      } else {
        dateUpdatedEvent.status = status.ACTIVE;
      }
      await this.eventRepo.save(dateUpdatedEvent);
    }

    if (updateEventData.stock !== foundEvent.stock) {
      if (updateEventData.stock > foundEvent.stock) {
        const plus = updateEventData.stock - foundEvent.stock;
        const currentStock = foundEvent.currentStock + plus;
        await this.eventRepo.update(id, { currentStock: currentStock });
      } else if (updateEventData.stock < foundEvent.stock) {
        const minus = foundEvent.stock - updateEventData.stock;
        const currentStock = foundEvent.currentStock - minus;
        await this.eventRepo.update(id, { currentStock: currentStock });
      }
    }
    await this.eventRepo.updateEvent(id, updateEventData);
    const updatedEvent = await this.eventRepo.findOneBy({ id });
    return updatedEvent;
  }

  async highlight(id) {
    const event: Event | null = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event not found`);
    }
    return await this.eventRepo.highlightEvent(id, !event.highlight);
  }

  async switchEventStatus(id: string) {
    const event: Event | null = await this.eventRepo.findOneBy({ id });
    if (!event) {
      throw new BadRequestException(`Event not found`);
    }
    return await this.eventRepo.switchEventStatus(id, event);
  }
}

/*
 async old(param){
    const event = await this.eventRepo.findOne({
      where: { id: param.eventId },
      relations: { assistants: true },
    });
    if (!event) throw new BadRequestException(`User or Event not found`);
    const userInfo = await this.userInfoRepo.findOne({
      where: { id: param.creator },
      relations: { user: true },
    });
    
    if (!userInfo) throw new BadRequestException(`User or Event not found`);
    const attendance = await this.eventAssistantsRepo.findOne({
      where: { user: { id: userInfo.id }, event: { id: event.id } },
    });
  
    const mailDto = {
      name: userInfo.user.name,
      email: userInfo.user.email,
      title: event.title,
      eventDate: event.eventDate,
      eventLocation: event.eventLocation,
      eventAddress: event.eventAddress
    };
  
    
    if (attendance && attendance.status === status.ACTIVE) {
      await this.eventAssistantsRepo.update(attendance.id, {status: status.INACTIVE});
      let updatedStock = event.currentStock;
      let vacancy = false;
     
      if (event.stock !== 0 && event.vacancy === false) {
        if (event.currentStock === 0) {
          vacancy = true;
          updatedStock += 1;
        }
        const updatedEventStock = {vacancy: vacancy, currentStock: updatedStock};
        await this.eventRepo.update(param.eventId, updatedEventStock);
        const updatedEvent = await this.eventRepo.findOne({
          where: { id: event.id }
        })
        console.log('SERVICIO DE ASISTENCIAS, ASISTENCIA CANCELADA, CURRENT STOCK +1',updatedEvent )
      }
      await this.mailerService.sendMailLeaveEvent(mailDto);
    }
  
    if (event.stock !== 0) {
      const updatedEvent = await this.eventRepo.findOne({
        where: { id: param.eventId }
      })
      if (updatedEvent.currentStock === 0) throw new BadRequestException(`Event ${event.title} is full`);
    }
    if (!attendance) {
      const newEventAttendant = await this.eventAssistantsRepo.create({
        user: userInfo,
        event,
        eventId: param.eventId,
        title: event.title,
        eventDate: event.eventDate,
        status: status.ACTIVE,
      });
      await this.eventAssistantsRepo.save(newEventAttendant);
      let vacancy = true;
      if (event.stock !== 0) {
        if (event.currentStock === 1) {
          vacancy = false;
        }
        await this.eventRepo.update(param.eventId, { vacancy: vacancy, currentStock: event.currentStock - 1 });
      }
      await this.mailerService.sendMailJoininEvent(mailDto);
    } else if (attendance.status === status.INACTIVE) {
      await this.eventAssistantsRepo.update(attendance.id, {
        status: status.ACTIVE,
      });
      const updatedEvent = await this.eventRepo.findOne({
        where: { id: param.eventId },
        relations: { assistants: true }
      })
      let vacancy = true;
      if (event.stock !== 0) {
        if (event.currentStock === 1) {
          vacancy = false;
        }
        await this.eventRepo.update(param.eventId, { vacancy: vacancy, currentStock: event.currentStock - 1 });
      }
      await this.mailerService.sendMailJoininEvent(mailDto);
    }
  }
*/
