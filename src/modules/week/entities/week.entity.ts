import { Column, Entity, ManyToOne } from 'typeorm';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { GroupEntity } from '../../group/entities/group.entity';

@Entity('weeks')
export class WeekEntity extends DeletedEntity {
  @Column({ type: 'boolean', nullable: false })
  isEven: boolean;

  @ManyToOne(() => GroupEntity, { nullable: false })
  private readonly group?: GroupEntity;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;
}
