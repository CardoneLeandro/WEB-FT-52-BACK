import { status } from "src/common/enum/status.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'donations'
})
export class Donation {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type: 'date', nullable: false})
    date: Date

    @Column({type: 'enum', enum: status,default: status.ACTIVE})
    status: status

    @Column({type: 'integer', nullable: false})
    amount: number
}
