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
import { UsersRepository } from 'src/users/users.repository';
import { AuthModule } from 'src/auth/auth.module'; // Asegúrate de usar la ruta correcta

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    EventsRepository,
    UserInformationRepository,
    EventAssistantsRepository,
    MailerService,
    UsersRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([Event, EventAssistants]),
    AuthModule, // Importa el módulo de autenticación aquí
  ],
})
export class EventsModule {}