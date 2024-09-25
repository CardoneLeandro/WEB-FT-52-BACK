import { status } from 'src/common/enum/status.enum';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'paymentCredentials',
})
export class PaymentCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.paymentCredentials)
  @JoinColumn({ name: 'userInformation_id' })
  userInformation: UserInformation;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'integer', nullable: false })
  ccNumber: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  ccOwner: string;

  @Column({ type: 'date', nullable: false })
  ccExpireDate: Date;
}
