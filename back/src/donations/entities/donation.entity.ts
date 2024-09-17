import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'donations'
})
export class Donation {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
