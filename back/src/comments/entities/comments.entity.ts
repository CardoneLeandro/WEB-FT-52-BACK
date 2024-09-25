import { status } from 'src/common/enum/status.enum';
import { Event } from 'src/events/entity/events.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne( () => UserInformation, (userInformation) => userInformation.comments )
  @JoinColumn({ name: 'creator_id' })
  creator: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'varchar', length: 140, nullable: false })
  content: string;

  @ManyToOne( () => Event, (event) => event.comments )
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
