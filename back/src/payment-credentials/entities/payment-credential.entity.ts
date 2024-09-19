import { status } from 'src/common/enum/status.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'paymentCredentials',
})
export class PaymentCredential {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status

  @Column({ type: 'integer', nullable: false })
  ccNumber: number

  @Column({ type: 'varchar', length: 50, nullable: false })
  ccOwner: string

  @Column({ type: 'date', nullable: false })
  ccExpireDate: Date
}
