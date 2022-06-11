import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { PermissionRolesEntity } from '../entities/permission-roles.entity';
import { PermissionRolesServiceInterface } from '../interefaces/permission-roles.service.interface';

@Injectable()
export class PermissionRolesService
  extends AbstractService<PermissionRolesEntity>
  implements PermissionRolesServiceInterface
{
  protected Entity = PermissionRolesEntity;

  protected async validateEntitiesBeforeSave(
    entities: Partial<PermissionRolesEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: implement
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
