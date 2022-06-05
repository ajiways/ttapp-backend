import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { SaveGroupDTO } from '../dto/save-group.dto';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entity/group.entity';

export type GroupList = Pick<GroupEntity, 'id' | 'title'>[];

export interface GroupSeviceInterface
  extends BaseServiceInterface<GroupEntity> {
  save(dto: SaveGroupDTO, manager?: EntityManager): Promise<GroupEntity>;

  //TODO: Добавить отсавшиеся поля по мере создания
  groupList(manager?: EntityManager): Promise<GroupList>;

  delete(id: string, manager?: EntityManager): Promise<boolean>;

  update(dto: UpdateGroupDTO, manager?: EntityManager): Promise<GroupEntity>;
}
