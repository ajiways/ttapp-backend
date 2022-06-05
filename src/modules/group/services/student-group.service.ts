import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { SaveStudentGroupDTO } from '../dto/save-student-group.dto';
import { StudentGroupEntity } from '../entity/student-groups.entity';
import { StudentGroupServiceInterface } from '../interfaces/student-group.service.interface';
import { GroupService } from './group.service';

@Injectable()
export class StudentGroupService
  extends AbstractService<StudentGroupEntity>
  implements StudentGroupServiceInterface
{
  protected Entity = StudentGroupEntity;

  @Inject()
  private readonly groupService: GroupService;

  protected async validateEntitiesBeforeSave(
    entities: Partial<StudentGroupEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    await this.groupService.findByIds(
      entities.map((entity) => {
        if (!entity.groupId) {
          throw new InternalServerErrorException(
            `No group was passed for student group ${entity.id}`,
          );
        }
        return entity.groupId;
      }, manager),
    );
  }

  async save(
    dto: SaveStudentGroupDTO,
    manager: EntityManager | undefined,
  ): Promise<StudentGroupEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, manager));
    }

    return await this.saveEntity(dto, manager);
  }

  async delete(
    id: string,
    manager: EntityManager | undefined,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) => this.delete(id, manager));
    }

    const toDelete = await this.findById(id, manager);

    return await this.deleteEntities([toDelete], manager);
  }

  async list(
    take: number,
    skip: number,
    manager: EntityManager | undefined,
  ): Promise<StudentGroupEntity[]> {
    const params = this.findWhereParams({}, { take, skip });

    return await this.findWhere({}, manager, params);
  }
}
