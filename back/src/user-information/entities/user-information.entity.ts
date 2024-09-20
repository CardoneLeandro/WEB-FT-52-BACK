import { Comment } from 'src/comments/entities/comments.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { Element } from 'src/element/entities/element.entity';
import { File } from 'src/files/entities/file.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentCredential } from 'src/payment-credentials/entities/payment-credential.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
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

  @OneToMany(() => Element, (element) => element.creator)
  events: Element[];

  @OneToMany(() => Comment, (comment) => comment.information)
  comments: Comment[];

  @OneToMany(() => File, (file) => file.information)
  files: File[];

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Element, (element) => element.creator)
  products: Element[];

  @OneToMany(() => Order, (order) => order.id)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.id)
  payments: Payment[];

  @OneToMany(
    () => PaymentCredential,
    (paymentCredential) => paymentCredential.id,
  )
  paymentCredentials: PaymentCredential[];

  @OneToMany(() => Donation, (donation) => donation.id)
  donations: Donation[];
}
