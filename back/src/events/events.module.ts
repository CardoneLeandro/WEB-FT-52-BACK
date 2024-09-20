import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Event } from './entities/event.entity';
import { ElementsRepository } from 'src/element/element.repository';
import { Element } from 'src/element/entities/element.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, ElementsRepository],
  // imports: [TypeOrmModule.forFeature([Element])],
})
export class EventsModule {}
