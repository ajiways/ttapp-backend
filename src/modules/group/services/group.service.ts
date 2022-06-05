import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { UserService } from '../../administration/services/user.service';
import { SaveGroupDTO } from '../dto/save-group.dto';
import { UpdateGroupDTO } from '../dto/update-group.dto';
import { GroupEntity } from '../entity/group.entity';
import {
  GroupList,
  GroupSeviceInterface,
} from '../interfaces/group.service.interface';

@Injectable()
export class GroupService
  extends AbstractService<GroupEntity>
  implements GroupSeviceInterface
{
  protected Entity = GroupEntity;
  protected deletedAtColumnName: string | null = 'deletedAt';

  @Inject(forwardRef(() => UserService))
  private readonly userService: UserService;

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

    return await this.saveEntity({ ...dto, creatorId: user.id }, manager);
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
}
