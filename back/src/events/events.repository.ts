import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { Repository } from "typeorm";

@Injectable()
export class EventsRepository {
    constructor (
        @InjectRepository(Event) private eventsRepository: Repository<Event>
    ) {}
}