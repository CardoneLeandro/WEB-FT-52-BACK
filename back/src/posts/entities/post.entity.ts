import { status } from 'src/common/enum/status.enum';
import { File } from 'src/files/entities/file.entity';
import { UserInformation } from 'src/user-information/entities/user-information.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserInformation, (userInformation) => userInformation.posts)
  @JoinColumn({ name: 'userInformationId' })
  creator: UserInformation;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status;

  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string[];

  @ManyToMany(() => File, (file) => file.posts)
  @JoinColumn({ name: 'file_id' })
  files: File[];
}
