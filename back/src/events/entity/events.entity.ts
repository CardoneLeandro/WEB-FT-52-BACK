import { status } from 'src/common/enum/status.enum';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventAssistants } from './event-assistants.entity';

@Entity({
  name: 'event',
})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.events)
  @JoinColumn()
  creator: UserInformation;

  @Column({ type: 'boolean', default: false, nullable: true })
  highlight: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  eventDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  eventLocation: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  eventAddress: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'boolean', default: true })
  vacancy: boolean;

  @Column({ type: 'int', nullable: true })
  stock: number;

  @Column({ type: 'int', nullable: true })
  currentStock: number;

  @Column({ type: 'varchar', array: true, nullable: false })
  images: string[];

  @OneToMany(() => EventAssistants, (eventAssistants) => eventAssistants.event)
  assistants: EventAssistants[];
}
