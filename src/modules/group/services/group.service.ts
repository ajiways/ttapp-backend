import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { UserService } from '../../administration/services/user.service';
import { DayService } from '../../day/services/day.service';
import { WeekService } from '../../week/services/week.service';
import { SaveGroupDTO } from '../dto/save-group.dto';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entities/group.entity';
import {
  GroupList,
  GroupSeviceInterface,
} from '../interfaces/group.service.interface';
import { GroupSchedule } from '../interfaces/schedule.interfaces';

@Injectable()
export class GroupService
  extends AbstractService<GroupEntity>
  implements GroupSeviceInterface
{
  protected Entity = GroupEntity;
  protected deletedAtColumnName: string | null = 'deletedAt';

  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;

  @Inject()
  private readonly weekService: WeekService;

  @Inject()
  private readonly dayService: DayService;

  protected async validateEntitiesBeforeSave(
    entities: Partial<GroupEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    await this.userService.findByIds(
      entities.map((entity) => {
        if (!entity.headmanId) {
          throw new InternalServerErrorException(
            `No headman was passed to the group ${entity.title}`,
          );
        }
        return entity.headmanId;
      }),
      manager,
    );
  }

  async save(
    dto: SaveGroupDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<GroupEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, user, manager));
    }

    const candidate = await this.findOneWhere({ title: dto.title }, manager);

    if (candidate) {
      throw new BadRequestException(
        `Group with name ${dto.title} already exists`,
      );
    }

    const group = await this.saveEntity(
      { ...dto, creatorId: user.id },
      manager,
    );

    await this.weekService.save(
      { groupId: group.id, isEven: true },
      user,
      manager,
    );

    await this.weekService.save(
      { groupId: group.id, isEven: false },
      user,
      manager,
    );

    return group;
  }

  async groupList(manager: EntityManager | undefined): Promise<GroupList> {
    if (!manager) {
      manager = this.connection.manager;
    }

    const groups = await this.findWhere({}, manager);

    return groups.map((group) => {
      return {
        id: group.id,
        title: group.title,
      };
    });
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

  async update(
    dto: UpdateGroupDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<GroupEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.update(dto, user, manager),
      );
    }

    const toUpdate = await this.findById(dto.id, manager);

    return await this.saveEntity(
      {
        ...toUpdate,
        ...dto,
        editorId: user.id,
      },
      manager,
    );
  }

  async getGroupSchedule(
    id: string,
    manager: EntityManager | undefined,
  ): Promise<GroupSchedule> {
    if (!manager) {
      manager = this.connection.manager;
    }

    const group = await this.findById(id, manager);

    const weeks = await this.weekService.findWhere(
      { groupId: group.id },
      manager,
    );

    const weeksIds = weeks.map((week) => week.id);

    const weekDays = await this.dayService.findWhere(
      { weekId: In(weeksIds) },
      manager,
    );

    //TODO: Complete
    return {
      id: group.id,
      title: group.title,
      weeks: weeks.map((week) => {
        return {
          id: week.id,
          isEven: week.isEven,
          days: weekDays.filter((day) => day.weekId === week.id),
        };
      }),
    };
  }
}
