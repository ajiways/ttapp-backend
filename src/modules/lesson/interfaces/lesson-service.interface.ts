import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveLessonDTO } from '../dto/save-lesson.dto';
import { UpdateLessonDTO } from '../dto/update-lesson.dto';
import { LessonEntity } from '../entities/lesson.entity';

export interface LessonServiceInterface
  extends BaseServiceInterface<LessonEntity> {
  save(
    dto: SaveLessonDTO,
    user?: UserEntity,
    manager?: EntityManager,
  ): Promise<LessonEntity>;

  update(
    dto: UpdateLessonDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<LessonEntity>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  getByDayId(dayId: string, manager?: EntityManager): Promise<LessonEntity[]>;
}
