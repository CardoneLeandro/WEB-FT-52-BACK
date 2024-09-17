import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'payments'
})
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
