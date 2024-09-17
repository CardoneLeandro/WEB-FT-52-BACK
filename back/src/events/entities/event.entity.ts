import { Comment } from "src/comments/entities/comments.entity";
import { status } from "src/common/enum/status.enum";
import { File } from "src/files/entities/file.entity";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'events' })
export class Event {

    @PrimaryColumn('uuid')
    id: string;

    @Column( { type: 'uuid', nullable: false })
    creator: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'enum', enum: status, default: status.PENDING })
    status:status

    @Column({ type: 'varchar', length: 50, nullable: false })
    title:string

    @Column({ type: 'text', length: 255, nullable: false })
    description:string

    @Column({ type: 'timestamp', nullable: false })
    date:Date

    @Column({ type: 'varchar', length: 100, nullable: false })
    location:string

    @ManyToOne(() => File, (file) => file.events)
    @JoinColumn({ name: 'file_id' })
    files:File

    @OneToMany(() => Comment, (comment) => comment.event)
    comments:Comment[]

    @ManyToOne(() => UserInformation, (userInformation) => userInformation.events)
    @JoinColumn({ name: 'user_information_id' })
    information: UserInformation;
}
