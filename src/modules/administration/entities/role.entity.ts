import { Column, Entity } from 'typeorm';
import { DeletedEntity } from '../../../common/helpers/created.entity';

@Entity('roles')
export class RoleEntity extends DeletedEntity {
  @Column({ type: 'varchar', nullable: false, length: 16 })
  title: string;
}
