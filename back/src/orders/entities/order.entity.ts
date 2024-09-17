import { status } from "src/common/enum/status.enum";
import { OrderDetail } from "src/order-details/entities/order-detail.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orders'
})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderDate: Date

    @Column({ type: 'enum', enum: status, default: status.ACTIVE })
    status: status

    @ManyToOne(() => UserInformation, userInformation => userInformation.orders)
    @JoinColumn({ name: 'user' })
    user: string

    @OneToOne(() => OrderDetail, orderDetail => orderDetail.id)
    orderDetail: OrderDetail

    @OneToOne(() => Payment, payment => payment.id)
    @JoinColumn({ name: 'paymentInformation' })
    paymentInformation: Payment
}
