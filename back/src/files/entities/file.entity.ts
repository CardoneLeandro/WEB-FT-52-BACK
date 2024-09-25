import { FileType } from 'src/common/enum/fileType.enum';
import { Post } from 'src/posts/entities/post.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.files)
  @JoinColumn({ name: 'userInformation_id' })
  creator: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  url: string;

  @ManyToMany(() => Post, (post) => post.files)
  posts: Post[];
}
