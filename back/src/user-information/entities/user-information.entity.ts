import { Comment } from 'src/comments/entities/comments.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { Event } from 'src/events/entity/events.entity';
import { File } from 'src/files/entities/file.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentCredential } from 'src/payment-credentials/entities/payment-credential.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Product } from 'src/products/entity/products.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'userInformation' })
export class UserInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.userInformation)
  user: User;

  @OneToMany(() => Event, (events) => events.creator)
  events: Event[];

  @OneToMany(() => Comment, (comment) => comment.information)
  comments: Comment[];

  @OneToMany(() => File, (file) => file.information)
  files: File[];

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

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
