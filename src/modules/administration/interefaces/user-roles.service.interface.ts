import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRolesEntity } from '../entities/user-roles.entity';
import { UserEntity } from '../entities/user.entity';

export interface UserRolesServiceInterface
  extends BaseServiceInterface<UserRolesEntity> {
  save(
    userId: string,
    roleId: string,
    creatorId?: string,
    manager?: EntityManager,
  ): Promise<UserRolesEntity>;

  getUserRoles(
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<Pick<RoleEntity, 'id' | 'title'>[]>;

  getUserPermissions(
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<PermissionEntity[]>;
}
