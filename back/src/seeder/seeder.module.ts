import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { UserInformationService } from 'src/user-information/user-information.service';
import { EventsService } from 'src/events/events.service';
import { EventsRepository } from 'src/events/events.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { EventAssistantsRepository } from 'src/events/event-assistants.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SeederController],
  providers: [
    SeederService,
    UsersRepository,
    UserInformationRepository,
    AuthService,
    ProductsRepository,
    UsersService,
    UserInformationService,
    EventsService,
    EventsRepository,
    EventAssistantsRepository,
    MailerService,
  ],
  exports: [SeederService],
  imports: [AuthModule],
})
export class SeederModule {}
