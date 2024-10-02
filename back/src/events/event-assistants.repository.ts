import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EventAssistants } from "./entity/event-assistants.entity";

@Injectable()
export class EventAssistantsRepository extends Repository<EventAssistants> {
    constructor(private readonly dSource: DataSource) {
        super(EventAssistants, dSource.getRepository(EventAssistants).manager);
    }

    async createEventAssistants(params) {
        const newEventAttendant = await this.create({ user: { id: params.userId}});
        const savedEventAttendant = await this.save(newEventAttendant);
        console.log('Gamma => EventAssistantsRepository, createEventAssistants, savedEventAttendant', savedEventAttendant);
        return savedEventAttendant;
    }
}