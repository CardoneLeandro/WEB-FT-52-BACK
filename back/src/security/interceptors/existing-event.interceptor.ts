import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { EventsService } from "src/events/events.service";

@Injectable()
export class ExistingEventInterceptor implements NestInterceptor {
constructor(private readonly eventSv: EventsService) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const eventId = request.params.id;
        try {
            const event = await this.eventSv.findOne(eventId);
            if (!event) {
                throw new BadRequestException('Event not found');
            }
            return next.handle();
        } catch {
            throw new BadRequestException('Event not found');
        }
    }

}