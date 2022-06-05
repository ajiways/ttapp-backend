import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
import { GroupService } from '../../group/services/group.service';
import { StudentGroupService } from '../../group/services/student-group.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserServiceInterface } from '../interefaces/user.service.interface';

@Injectable()
export class UserService
  extends AbstractService<UserEntity>
  implements UserServiceInterface
{
  protected Entity = UserEntity;
  protected deletedAtColumnName: string | null = 'deletedAt';

  @Inject(forwardRef(() => GroupService))
  private readonly groupService: GroupService;

  @Inject()
  private readonly studentGroupService: StudentGroupService;

  protected async validateEntitiesBeforeSave(): Promise<void> {
    //TODO: Nothing to do
  }

  async save(
    dto: CreateUserDTO,
    manager: EntityManager | undefined,
  ): Promise<UserEntity & { groupId: string }> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, manager));
    }

    const candidates = await this.findOneWhere({ login: dto.login }, manager);

    if (candidates) {
      throw new BadRequestException(
        `User with login ${dto.login} already exists`,
      );
    }

    const user = await this.saveEntity(
      {
        login: dto.login,
        password: await hash(dto.password, 7),
      },
      manager,
    );

    const group = await this.groupService.findById(dto.groupId, manager);

    await this.studentGroupService.save(
      {
        groupId: group.id,
        studentId: user.id,
      },
      manager,
    );

    return { ...user, groupId: group.id };
  }

  async update(
    dto: UpdateUserDTO,
    manager?: EntityManager,
  ): Promise<UserEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.update(dto, manager));
    }

    const existingUser = await this.findById(dto.id, manager);

    return await this.saveEntity(
      {
        ...existingUser,
        ...dto,
      },
      manager,
    );
  }

  async findAll(manager: EntityManager | undefined): Promise<UserEntity[]> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findWhere({}, manager);
  }

  async delete(id: string, manager?: EntityManager): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) => this.delete(id, manager));
    }

    const candidate = await this.findById(id, manager);

    return await this.deleteEntities([candidate], manager);
  }

  async findByLogin(
    login: string,
    manager?: EntityManager,
  ): Promise<UserEntity | undefined> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findOneWhere({ login }, manager);
  }

  async findByIdNoError(
    id: string,
    manager: EntityManager | undefined,
  ): Promise<UserEntity | undefined> {
    if (!manager) {
      manager = this.connection.manager;
    }

    return await this.findByIdOrNull(id, manager);
  }
}
