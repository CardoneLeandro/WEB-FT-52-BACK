import { Coment } from "src/coments/entities/coment.entity";
import { Event } from "src/events/entities/event.entity";
import { File } from "src/files/entities/file.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_information' })
export class UserInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User,{eager : true})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Event, (event) => event.information)
    events: Event[];

    @OneToMany(() => Coment, (coment) => coment.information)
    comments: Coment[];

    @OneToMany(() => File, (file) => file.information)
    files: File[]
    
}

