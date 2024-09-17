import { status } from "src/common/enum/status.enum";
import { Donation } from "src/donations/entities/donation.entity";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'payments'
})
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => UserInformation, userInformation => userInformation.payments)
    @JoinColumn({ name: 'user' })
    user:UserInformation

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    paymentDate: Date

    @Column({ type: 'int', nullable: false })
    ccl4LastNumber: number

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.id)
    @JoinColumn({ name: 'Detail' })
    Detail: OrderDetail

    @Column({ type: 'enum', enum: status, default: status.ACTIVE })
    orderStatus: status

    @OneToOne(() => Donation, donation => donation.id)
    @JoinColumn({ name: 'donation' })
    donation: Donation
}
