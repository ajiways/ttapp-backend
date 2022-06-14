import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveGroupDTO } from '../dto/save-group.dto';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entities/group.entity';
import { GroupSchedule } from './schedule.interfaces';

export type GroupList = Pick<GroupEntity, 'id' | 'title' | 'headmanId'>[];

export interface GroupSeviceInterface
  extends BaseServiceInterface<GroupEntity> {
  save(
    dto: SaveGroupDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<GroupEntity>;

  //TODO: Добавить отсавшиеся поля по мере создания
  groupList(manager?: EntityManager): Promise<GroupList>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  update(
    dto: UpdateGroupDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<GroupEntity>;

  getGroupSchedule(id: string, manager?: EntityManager): Promise<GroupSchedule>;
}
