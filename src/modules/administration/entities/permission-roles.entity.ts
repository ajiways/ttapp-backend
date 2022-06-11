import { Column, Entity, ManyToOne } from 'typeorm';
import { DeletedEntity } from '../../../common/helpers/created.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity('permission_roles')
export class PermissionRolesEntity extends DeletedEntity {
  @ManyToOne(() => PermissionEntity, { nullable: false })
  private permission: PermissionEntity;

  @ManyToOne(() => RoleEntity, { nullable: false })
  private role: RoleEntity;

  @Column({ type: 'uuid', nullable: false })
  permissionId: string;

  @Column({ type: 'uuid', nullable: false })
  roleId: string;
}
