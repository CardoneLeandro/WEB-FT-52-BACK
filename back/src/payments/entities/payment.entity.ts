import { elementType } from 'src/common/enum/elementType.enum';
import { status } from 'src/common/enum/status.enum';
import { Donation } from 'src/donations/entities/donation.entity';
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

  @ManyToOne(
    () => UserInformation,
    (userInformation) => userInformation.payments,
  )
  @JoinColumn({ name: 'user' })
  user: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  orderStatus: status;

  @Column({ type: 'enum', enum: elementType, nullable: false })
  type: elementType;

  @OneToOne(() => Donation, (donation) => donation.payment)
  donation: Donation;
}
