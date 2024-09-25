import { status } from 'src/common/enum/status.enum';
import { Donation } from 'src/donations/entities/donation.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Order } from 'src/orders/entities/order.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'payments',
})
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne( () => UserInformation, (userInformation) => userInformation.payments )
  @JoinColumn({ name: 'user' })
  user: UserInformation;

  @Column({ type: 'int', nullable: false })
  ccFourLastNumber: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  orderStatus: status;

  @OneToOne(() => Order, (order) => order.paymentInformation)
  @JoinColumn({ name: 'order' })
  order: Order;

  @OneToOne(() => Donation, (donation) => donation.id)
  @JoinColumn({ name: 'donation' })
  donation: Donation;

  //! Validar enum de paymentStatus
}
