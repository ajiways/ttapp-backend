import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { PermissionEntity } from '../entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRolesEntity } from '../entities/user-roles.entity';
import { UserEntity } from '../entities/user.entity';
import { UserRolesServiceInterface } from '../interefaces/user-roles.service.interface';
import { PermissionRolesService } from './permission-roles.service';
import { PermissionService } from './permissions.service';
import { RolesService } from './roles.service';

@Injectable()
export class UserRolesService
  extends AbstractService<UserRolesEntity>
  implements UserRolesServiceInterface
{
  protected Entity = UserRolesEntity;

  @Inject()
  private readonly rolesService: RolesService;

  @Inject()
  private readonly permissionRolesService: PermissionRolesService;

  @Inject()
  private readonly permissionsService: PermissionService;

  protected async validateEntitiesBeforeSave(
    entities: Partial<UserRolesEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: implement
  }

  async getUserPermissions(
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<PermissionEntity[]> {
    if (!manager) {
      manager = this.connection.manager;
    }

    const userRoles = await this.findWhere({ userId: user.id }, manager);
    const roles = await this.rolesService.findByIds(
      userRoles.map((i) => i.roleId),
      manager,
    );
    const permissionRoles = await this.permissionRolesService.findWhere(
      {
        roleId: In(roles.map((i) => i.id)),
      },
      manager,
    );
    return await this.permissionsService.findByIds(
      permissionRoles.map((i) => i.permissionId),
      manager,
    );
  }

  async getUserRoles(
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<RoleEntity[]> {
    if (!manager) {
      manager = this.connection.manager;
    }

    const userRoles = await this.findWhere({ userId: user.id }, manager);
    return this.rolesService.findByIds(
      userRoles.map((i) => i.roleId),
      manager,
    );
  }

  async save(
    userId: string,
    roleId: string,
    creatorId?: string,
    manager?: EntityManager,
  ): Promise<UserRolesEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.save(userId, roleId, creatorId, manager),
      );
    }

    const candidate = await this.findOneWhere({ userId, roleId }, manager);

    if (candidate) {
      throw new BadRequestException(
        'This role already attached to selected user',
      );
    }

    return await this.saveEntity({ roleId, userId, creatorId }, manager);
  }
}
