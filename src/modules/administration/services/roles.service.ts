import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { RoleEntity } from '../entities/role.entity';
import { RolesServiceInterface } from '../interefaces/roles.service.interface';

@Injectable()
export class RolesService
  extends AbstractService<RoleEntity>
  implements RolesServiceInterface
{
  protected Entity = RoleEntity;

  protected async validateEntitiesBeforeSave(
    entities: Partial<RoleEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: implement
  }

  save(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getRoleByTitle(
    title: string,
    manager: EntityManager | undefined,
  ): Promise<RoleEntity | undefined> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findOneWhere({ title }, manager);
  }
}
