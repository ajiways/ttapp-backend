import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveDayDTO } from '../dto/save-day.dto';
import { UpdateDayDTO } from '../dto/update-day.dto';
import { DayEntity } from '../entities/day.entity';
import { DayServiceInterface } from '../interfaces/day-service.interface';

@Injectable()
export class DayService
  extends AbstractService<DayEntity>
  implements DayServiceInterface
{
  protected Entity = DayEntity;
  protected deletedAtColumnName: string | null = 'deletedAt';

  protected async validateEntitiesBeforeSave(
    entities: Partial<DayEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: implement
  }

  async save(
    dto: SaveDayDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<DayEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, user, manager));
    }

    const existedDay = await this.findOneWhere(
      {
        weekId: dto.weekId,
        order: dto.order,
      },
      manager,
    );

    if (existedDay) {
      throw new BadRequestException(
        `Day with order ${dto.order} in week ${dto.weekId} already exists`,
      );
    }

    return await this.saveEntity({ ...dto, creatorId: user.id }, manager);
  }

  async update(
    dto: UpdateDayDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<DayEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.update(dto, user, manager),
      );
    }

    const toUpdate = await this.findById(dto.id, manager);
    toUpdate.editorId = user.id;

    return await this.saveEntity({ ...toUpdate, ...dto }, manager);
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

  async getWeekDays(
    weekId: string,
    manager: EntityManager | undefined,
  ): Promise<DayEntity[]> {
    return await this.findWhere({ weekId }, manager);
  }
}
