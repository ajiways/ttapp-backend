import { Column, Entity, OneToOne } from 'typeorm';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { UserEntity } from '../../administration/entities/user.entity';

@Entity('groups')
export class GroupEntity extends DeletedEntity {
  @OneToOne(() => UserEntity, { nullable: true })
  private headman?: UserEntity;

  @Column({ type: 'uuid', nullable: true })
  headmanId: string;

  @Column({ type: 'varchar', nullable: false })
  title: string;
}
