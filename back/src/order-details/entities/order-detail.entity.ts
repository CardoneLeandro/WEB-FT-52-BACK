import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orderDetails'
})
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
