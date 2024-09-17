
import { FileType } from "src/common/enum/fileType.enum";
import { status } from "src/common/enum/status.enum";
import { File } from "src/files/entities/file.entity";
import { UserInformation } from "src/user-information/entities/user-information.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'posts' })
export class Post {


    @PrimaryColumn('uuid')
    id: string;

    @Column([{ type: 'uuid', nullable: false }])
    creator: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createDate: Date;

    @Column({ type: 'enum', enum: status, default: status.ACTIVE })
    status: status;

    @Column({ type: 'text', nullable: false })
    content:string;

    @Column({type: 'enum', enum: FileType, nullable: true})
    type: FileType

    @ManyToOne(() => UserInformation,(userInformation) => userInformation.posts)
    @JoinColumn({ name: 'user_information_id' })
    information: UserInformation;

    @ManyToOne(() => File, (file) => file.posts)
    @JoinColumn({ name: 'file_id' })
    files: File[]
}
