import { status } from 'src/common/enum/status.enum';
import { Payment } from 'src/payments/entities/payment.entity';
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
  name: 'donations',
})
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => UserInformation,
    (userInformation) => userInformation.donations,
  )
  @JoinColumn()
  user: UserInformation;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: 'Gracias por tu ayuda',
  })
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'enum', enum: status })
  status: status;

  @Column({ type: 'integer', nullable: false })
  amount: number;

  @OneToOne(() => Payment, (payment) => payment.donation)
  @JoinColumn({ name: 'payments_id' })
  payment: Payment;
}
