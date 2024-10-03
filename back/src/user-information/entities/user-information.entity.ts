import { Comment } from 'src/comments/entities/comments.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { EventAssistants } from 'src/events/entity/event-assistants.entity';
import { Event } from 'src/events/entity/events.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Product } from 'src/products/entity/products.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'userInformation' })
export class UserInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.userInformation)
  user: User;

  @OneToMany(() => Event, (event) => event.creator)
  events: Event[];

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.creator)
  comments: Comment[];

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];

  @OneToMany(() => EventAssistants, (eventAssistants) => eventAssistants.user)
  assistantEvents: EventAssistants[];
}
