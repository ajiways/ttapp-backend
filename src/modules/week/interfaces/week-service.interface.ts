import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveWeekDTO } from '../dto/save-week.dto';
import { UpdateWeekDTO } from '../dto/update-week.dto';
import { WeekEntity } from '../entities/week.entity';

export interface WeekServiceInterface extends BaseServiceInterface<WeekEntity> {
  save(
    dto: SaveWeekDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<WeekEntity>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  getGroupWeeks(
    groupId: string,
    manager?: EntityManager,
  ): Promise<WeekEntity[]>;

  update(
    dto: UpdateWeekDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<WeekEntity>;
}
