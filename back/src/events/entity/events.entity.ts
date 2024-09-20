import { Comment } from 'src/comments/entities/comments.entity';
import { elementType } from 'src/common/enum/elementType.enum';
import { status } from 'src/common/enum/status.enum';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'events',
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

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  eventDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  eventLocation: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: true })
  stock: number;

  @Column({ type: 'varchar', array: true, nullable: false })
  images: string[];

  @OneToMany(() => Comment, (comment) => comment.element)
  comments: Comment[];

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.Elements)
  orderDetail: OrderDetail;
}
