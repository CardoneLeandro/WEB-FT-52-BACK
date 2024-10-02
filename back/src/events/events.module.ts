import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/events.entity';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { EventAssistantsRepository } from './event-assistants.repository';
import { EventAssistants } from './entity/event-assistants.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, UserInformationRepository, EventAssistantsRepository, MailerService],
  imports: [TypeOrmModule.forFeature([Event, EventAssistants])],
})
export class EventsModule {}
