import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { RoleEntity } from '../entities/role.entity';

export interface RolesServiceInterface
  extends BaseServiceInterface<RoleEntity> {
  save(): Promise<void>;

  getRoleByTitle(
    title: string,
    manager?: EntityManager,
  ): Promise<RoleEntity | undefined>;
}
