import { status } from 'src/common/enum/status.enum';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne( () => UserInformation, (userInformation) => userInformation.products )
  @JoinColumn()
  creator: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: true })
  stock: number;

  @Column({ type: 'varchar', array: true, nullable: false })
  images: string[];
}
