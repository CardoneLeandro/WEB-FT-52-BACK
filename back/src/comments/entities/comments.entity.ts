import { Event } from 'src/events/entities/event.entity'
import { status } from 'src/common/enum/status.enum'
import { UserInformation } from 'src/user-information/entities/user-information.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  creator: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date

  @Column({ type: 'enum', enum: status, default: status.ACTIVE })
  status: status

  @Column({ type: 'varchar', length: 140, nullable: false })
  content: string

  @ManyToOne(
    () => UserInformation,
    (userInformation) => userInformation.comments,
  )
  @JoinColumn({ name: 'userInformation_id' })
  information: UserInformation

  @ManyToOne(() => Event, (event) => event.comments)
  @JoinColumn({ name: 'event_id' })
  event: Event
}
