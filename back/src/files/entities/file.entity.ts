import { FileType } from 'src/common/enum/fileType.enum';
import { Event } from 'src/events/entities/event.entity';
import { Post } from 'src/posts/entities/post.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: FileType, nullable: false })
  type: FileType;

  @Column({ type: 'varchar', length: 100, nullable: false })
  creator: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  url: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.files)
  @JoinColumn({ name: 'userInformation_id' })
  information: UserInformation;

  @OneToMany(() => Event, (event) => event.files)
  events: Event[];

  @OneToMany(() => Post, (post) => post.files)
  posts: Post[];
}
