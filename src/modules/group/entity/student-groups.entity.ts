import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { DeletedEntity } from '../../../common/config/created.entity';
import { UserEntity } from '../../administration/entities/user.entity';
import { GroupEntity } from './group.entity';

@Entity('student_groups')
export class StudentGroupEntity extends DeletedEntity {
  @OneToOne(() => UserEntity, { nullable: false })
  private readonly student?: UserEntity;

  @Column({ type: 'uuid', nullable: false })
  studentId: string;

  @ManyToOne(() => GroupEntity, { nullable: false })
  private readonly group?: GroupEntity;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;
}
