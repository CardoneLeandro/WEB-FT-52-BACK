import { Order } from "src/orders/entities/order.entity";
import { Payment } from "src/payments/entities/payment.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orderDetails'
})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Order, order => order.id)
    order: Order

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({ name: 'product' })
    products: Product[]

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    @Column({ type: 'float', nullable: false })
    total: number

    @OneToOne(() => Payment, payment => payment.id)
    @JoinColumn({ name: 'payment' })
    payment: Payment
}
