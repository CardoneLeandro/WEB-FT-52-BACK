import { Element } from 'src/element/entities/element.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orderDetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.id)
  order: Order;

  @OneToMany(() => Element, (element) => element.orderDetail)
  @JoinColumn()
  Elements: Element[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'float', nullable: false })
  total: number;

  @OneToOne(() => Payment, (payment) => payment.id)
  @JoinColumn({ name: 'payment' })
  payment: Payment;
}
