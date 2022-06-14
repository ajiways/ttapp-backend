import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { keyBy } from 'lodash';
import { EPermission } from '../../../common/enums/permissions';
import { UserRolesServiceInterface } from '../../administration/interefaces/user-roles.service.interface';
import { UserServiceInterface } from '../../administration/interefaces/user.service.interface';
import { UserRolesService } from '../../administration/services/user-roles.service';
import { UserService } from '../../administration/services/user.service';
import { RequestInterface } from '../controllers/common/requestResponse.interfaces';

export const RequirePermissions = (permission: EPermission[]) =>
  SetMetadata('requiredPermissions', permission);

@Injectable()
export class RolesGuard implements CanActivate {
  @Inject()
  private readonly reflector: Reflector;

  @Inject(UserRolesService)
  private readonly userRolesService: UserRolesServiceInterface;

  @Inject(UserService)
  private readonly userService: UserServiceInterface;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest<RequestInterface>();

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    if (!headers['x-user-id'] || headers['x-user-id'] === 'null') {
      return false;
    }

    const user = await this.userService.findById(headers['x-user-id']);

    const requiredPermissions =
      this.reflector.get<EPermission[]>(
        'requiredPermissions',
        context.getHandler(),
      ) || [];

    if (!requiredPermissions.length) {
      return true;
    }

    const requiredPermissionsCount = requiredPermissions.length;

    const userPermissions = await this.userRolesService.getUserPermissions(
      user,
    );

    const userPermissionsByType = keyBy(userPermissions, ({ type }) => type);

    let matchedPermissions = 0;

    for (const permission of requiredPermissions) {
      if (userPermissionsByType[permission]) {
        matchedPermissions++;
      }
    }

    if (matchedPermissions !== requiredPermissionsCount) {
      return false;
    }

    return true;
  }
}
