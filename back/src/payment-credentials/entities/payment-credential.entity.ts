import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'paymentCredentials'
})
export class PaymentCredential {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
