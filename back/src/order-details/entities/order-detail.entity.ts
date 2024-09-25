import { Event } from 'src/events/entity/events.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entity/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orderDetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinColumn()
  products: Product[];

  @ManyToMany(() => Event, (event) => event.id)
  @JoinColumn()
  events: Event[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'float', nullable: false })
  total: number;
}
