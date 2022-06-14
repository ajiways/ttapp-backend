import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveLessonDTO } from '../dto/save-lesson.dto';
import { UpdateLessonDTO } from '../dto/update-lesson.dto';
import { LessonEntity } from '../entities/lesson.entity';
import { LessonServiceInterface } from '../interfaces/lesson-service.interface';

@Injectable()
export class LessonService
  extends AbstractService<LessonEntity>
  implements LessonServiceInterface
{
  protected Entity = LessonEntity;

  protected deletedAtColumnName: string | null = 'deletedAt';

  protected async validateEntitiesBeforeSave(
    entities: Partial<LessonEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: impelement
  }

  async save(
    dto: SaveLessonDTO,
    user?: UserEntity,
    manager?: EntityManager,
  ): Promise<LessonEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, user, manager));
    }

    const existingLesson = await this.findOneWhere(
      {
        order: dto.order,
        dayId: dto.dayId,
      },
      manager,
    );

    if (existingLesson) {
      throw new BadRequestException(
        `Lesson with order ${dto.order} in day ${dto.dayId} already exists`,
      );
    }

    return await this.saveEntity({ ...dto, creatorId: user?.id }, manager);
  }

  async update(
    dto: UpdateLessonDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<LessonEntity> {
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
    manager?: EntityManager,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) => this.delete(id, user, manager));
    }

    const toDelete = await this.findById(id, manager);
    toDelete.deleterId = user.id;
    toDelete.deletedAt = new Date(Date.now());

    await this.saveEntity(toDelete, manager);

    return true;
  }

  async getByDayId(
    dayId: string,
    manager?: EntityManager,
  ): Promise<LessonEntity[]> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findWhere({ dayId }, manager);
  }
}
