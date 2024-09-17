import { Event } from "src/events/entities/event.entity";
import { status } from "src/common/enum/status.enum";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'coments'})
export class Coment {

    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'uuid', nullable: false })
    creator: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({type: 'enum', enum: status, default: status.ACTIVE})

    @Column({ type: 'varchar', length: 140, nullable: false })

    @ManyToOne(() => UserInformation, (userInformation) => userInformation.comments)
    @JoinColumn({ name: 'user_information_id' })
    information: UserInformation;

    @ManyToOne(() => Event, (event) => event.coments)
    @JoinColumn({ name: 'event_id' })
    event: Event;


}
