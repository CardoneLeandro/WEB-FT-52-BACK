import { status } from "src/common/enum/status.enum";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'products'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'uuid', nullable: false})
    creator:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate:Date

    @Column({ type: 'timestamp', nullable: true })
    updateDate:Date

    @Column({ type: 'enum', enum: status, default:status.ACTIVE })
    status:status

    @Column({ type: 'varchar', length: 50, nullable: false })
    title:string

    @Column({ type: 'varchar', length: 100, nullable: false })
    image:string

    @Column({ type: 'varchar', length: 100, nullable: false })
    description:string

    @Column({ type: 'int', nullable: false })
    price:number

    @Column({ type: 'int', nullable: false })
    stock:number

    @ManyToMany(() => UserInformation, (userInformation) => userInformation.products)
    @JoinColumn()
    information:UserInformation
}
