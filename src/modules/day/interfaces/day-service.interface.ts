import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveDayDTO } from '../dto/save-day.dto';
import { UpdateDayDTO } from '../dto/update-day.dto';
import { DayEntity } from '../entities/day.entity';

export interface DayServiceInterface extends BaseServiceInterface<DayEntity> {
  save(
    dto: SaveDayDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<DayEntity>;

  update(
    dto: UpdateDayDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<DayEntity>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  getWeekDays(weekId: string, manager?: EntityManager): Promise<DayEntity[]>;
}
