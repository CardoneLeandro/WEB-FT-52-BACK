import { status } from 'src/common/enum/status.enum';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './events.entity';

@Entity({ name: 'event_assistants' })
export class EventAssistants {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'uuid', nullable: false })
  eventId: string;

  @ManyToOne(
    () => UserInformation,
    (userInformation) => userInformation.assistantEvents,
  )
  @JoinColumn()
  user: UserInformation;

  @ManyToOne(() => Event, (event) => event.assistants)
  @JoinColumn()
  event: Event;
}
