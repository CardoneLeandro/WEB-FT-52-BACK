import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  imports: [TypeOrmModule.forFeature([Event])]
})
export class EventsModule {}
