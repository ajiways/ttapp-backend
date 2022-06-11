import { BaseServiceInterface } from '../../../common/base-service.interface';
import { PermissionRolesEntity } from '../entities/permission-roles.entity';

export interface PermissionRolesServiceInterface
  extends BaseServiceInterface<PermissionRolesEntity> {
  save(): Promise<void>;
}
