import { Comment } from 'src/comments/entities/comments.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import { Event } from 'src/events/entity/events.entity';
import { File } from 'src/files/entities/file.entity';
// import { File } from 'src/files/entities/file.entity';
import { Order } from 'src/orders/entities/order.entity';
import { PaymentCredential } from 'src/payment-credentials/entities/payment-credential.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Product } from 'src/products/entity/products.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  
  @OneToMany(() => Order, (order) => order.id)
  orders: Order[];
  
  @OneToMany(() => Product, (product) => product.creator)
  products: Product[];

  @OneToMany(() => Payment, (payment) => payment.id)
  payments: Payment[];
  
  @OneToMany(() => Donation, (donation) => donation.id)
  donations: Donation[];
  
  @OneToMany( () => PaymentCredential, (paymentCredential) => paymentCredential.id )
  paymentCredentials: PaymentCredential[];

  @ManyToMany(() => File, (file) => file.creator)
  files: File[];

  @ManyToMany(() => Event, (event) => event.assistants)
  assistantEvents: Event[];
}
