import { BaseServiceInterface } from '../../../common/base-service.interface';
import { PermissionEntity } from '../entities/permission.entity';

export interface PermissionServiceInterface
  extends BaseServiceInterface<PermissionEntity> {
  save(): Promise<void>;
}
