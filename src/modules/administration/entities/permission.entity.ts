import { Column, Entity } from 'typeorm';
import { EPermission } from '../../../common/enums/permissions';
import { DeletedEntity } from '../../../common/helpers/created.entity';

@Entity('permissions')
export class PermissionEntity extends DeletedEntity {
  @Column({ type: 'enum', enum: EPermission, nullable: false })
  type: EPermission;
}
