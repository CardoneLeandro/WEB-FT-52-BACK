import { FileType } from 'src/common/enum/fileType.enum';
import { status } from 'src/common/enum/status.enum';
import { File } from 'src/files/entities/file.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.posts)
  @JoinColumn({ name: 'userInformation_id' })
  creator: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => File, (file) => file.posts)
  @JoinColumn({ name: 'file_id' })
  files: File[];
}
