import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';

import { EventsService } from 'src/events/events.service';

@Injectable()
export class ExistingEventGuard implements CanActivate {
  constructor(private readonly eventSv: EventsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.params.id;
    try {
      const event = await this.eventSv.findOne(eventId);
      if (!event) {
        return false;
      }
      return true;
    } catch {
      throw new BadRequestException('Event not found');
    }
  }
}
