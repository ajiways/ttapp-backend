import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveWeekDTO } from '../dto/save-week.dto';
import { UpdateWeekDTO } from '../dto/update-week.dto';
import { WeekEntity } from '../entities/week.entity';
import { WeekServiceInterface } from '../interfaces/week-service.interface';

@Injectable()
export class WeekService
  extends AbstractService<WeekEntity>
  implements WeekServiceInterface
{
  protected Entity = WeekEntity;

  protected async validateEntitiesBeforeSave(): Promise<void> {
    //TODO: nothing to do
  }

  async save(
    dto: SaveWeekDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<WeekEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, user, manager));
    }

    const existingWeek = await this.findOneWhere(
      { isEven: dto.isEven, groupId: dto.groupId },
      manager,
    );

    if (existingWeek) {
      throw new BadRequestException(
        `Week with this type already exists in this group`,
      );
    }

    return await this.saveEntity({ ...dto, creatorId: user.id }, manager);
  }

  async delete(
    id: string,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) => this.delete(id, user, manager));
    }

    const toDelete = await this.findById(id, manager);
    toDelete.deleterId = user.id;

    return await this.deleteEntities([toDelete], manager);
  }

  async getGroupWeeks(
    groupId: string,
    manager: EntityManager | undefined,
  ): Promise<WeekEntity[]> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findWhere({ groupId }, manager);
  }

  async update(
    dto: UpdateWeekDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<WeekEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.update(dto, user, manager),
      );
    }

    const toUpdate = await this.findById(dto.id, manager);
    toUpdate.editorId = user.id;

    return await this.saveEntity({ ...toUpdate, ...dto }, manager);
  }
}
