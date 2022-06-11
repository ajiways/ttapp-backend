import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionServiceInterface } from '../interefaces/permission.service.intarface';

@Injectable()
export class PermissionService
  extends AbstractService<PermissionEntity>
  implements PermissionServiceInterface
{
  protected Entity = PermissionEntity;

  protected async validateEntitiesBeforeSave(
    entities: Partial<PermissionEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: implement
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
