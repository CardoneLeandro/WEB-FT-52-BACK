import { status } from 'src/common/enum/status.enum';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'donations',
})
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.donations)
  @JoinColumn()
  user: UserInformation;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'integer', nullable: false })
  amount: number;
}
