import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from '../../common/enum/userRole.enum';
import { status } from 'src/common/enum/status.enum';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  providerAccountId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateDate: Date;

  @OneToOne(() => UserInformation, (userInfo) => userInfo.user)
  @JoinColumn({ name: 'userInformation_id' })
  userInformation: UserInformation;
}
