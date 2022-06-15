import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { AbstractService } from '../../../common/services/abstract.service';
import { GroupService } from '../../group/services/group.service';
import { StudentGroupService } from '../../group/services/student-group.service';
import { SaveHeadmanDTO } from '../dto/create-headman.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateSelfPasswordDTO } from '../dto/update-self-password.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserServiceInterface } from '../interefaces/user.service.interface';
import { RolesService } from './roles.service';
import { UserRolesService } from './user-roles.service';

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

  @Inject()
  private readonly userRolesService: UserRolesService;

  @Inject()
  private readonly rolesService: RolesService;

  protected async validateEntitiesBeforeSave(
    entities: Partial<UserEntity>[],
    manager: EntityManager,
  ): Promise<void> {
    //TODO: fix
  }

  async save(
    dto: CreateUserDTO,
    manager: EntityManager | undefined,
    user?: UserEntity,
  ): Promise<UserEntity & { groupId: string }> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, manager, user));
    }

    const candidates = await this.findOneWhere({ login: dto.login }, manager);

    const group = await this.groupService.findById(dto.groupId, manager);

    if (candidates) {
      throw new BadRequestException(
        `User with login ${dto.login} already exists`,
      );
    }

    const savedUser = await this.saveEntity(
      {
        login: dto.login,
        password: await hash(dto.password, 7),
        creatorId: user?.id,
        groupId: group?.id,
      },
      manager,
    );

    await this.studentGroupService.save(
      {
        groupId: group.id,
        studentId: savedUser.id,
      },
      manager,
      user,
    );

    const studentRole = await this.rolesService.findOneWhere(
      {
        title: 'student',
      },
      manager,
    );

    await this.userRolesService.saveEntity(
      {
        roleId: studentRole?.id,
        userId: savedUser.id,
      },
      manager,
    );

    return { ...savedUser, groupId: group.id };
  }

  async createHeadman(
    dto: SaveHeadmanDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<UserEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.createHeadman(dto, user, manager),
      );
    }

    const candidates = await this.findOneWhere({ login: dto.login }, manager);

    if (candidates) {
      throw new BadRequestException(
        `User with login ${dto.login} already exists`,
      );
    }

    const studentRole = await this.rolesService.findOneWhere(
      {
        title: 'student',
      },
      manager,
    );

    const headmanRole = await this.rolesService.findOneWhere(
      {
        title: 'headman',
      },
      manager,
    );

    const savedUser = await this.saveEntity(
      {
        login: dto.login,
        password: await hash(dto.password, 7),
        creatorId: user.id,
      },
      manager,
    );

    await this.userRolesService.saveEntities(
      [
        {
          roleId: studentRole?.id,
          userId: savedUser.id,
        },
        {
          roleId: headmanRole?.id,
          userId: savedUser.id,
        },
      ],
      manager,
    );

    return savedUser;
  }

  async update(
    dto: UpdateUserDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<UserEntity> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.update(dto, user, manager),
      );
    }

    const existingUser = await this.findById(dto.id, manager);

    return await this.saveEntity(
      {
        ...existingUser,
        ...dto,
        editorId: user.id,
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

  async delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) => this.delete(id, user, manager));
    }

    const candidate = await this.findById(id, manager);
    candidate.deleterId = user.id;

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

  async updateSelfPassword(
    dto: UpdateSelfPasswordDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.updateSelfPassword(dto, user, manager),
      );
    }

    const passwordMatched = await compare(dto.oldPassword, user.password);

    if (!passwordMatched) {
      throw new BadRequestException(`Wrong password`);
    }

    const newHashedPassword = await hash(dto.newPassword, 7);

    user.password = newHashedPassword;
    user.editorId = user.id;

    await this.updateEntity({ id: user.id }, user, manager);

    return true;
  }

  async updateSelfGroup(
    dto: EntityIdDTO,
    user: UserEntity,
    manager: EntityManager | undefined,
  ): Promise<boolean> {
    if (!manager) {
      return this.startTransaction((manager) =>
        this.updateSelfGroup(dto, user, manager),
      );
    }

    const newGroup = await this.groupService.findById(dto.id, manager);
    const studentGroup = await this.studentGroupService.findOneWhere(
      { studentId: user.id },
      manager,
    );

    if (!studentGroup) {
      throw new InternalServerErrorException(`No student group for this user`);
    }

    user.groupId = newGroup.id;
    studentGroup.groupId = newGroup.id;

    await this.studentGroupService.updateEntity(
      { studentId: user.id },
      studentGroup,
      manager,
    );

    await this.updateEntity({ id: user.id }, user, manager);

    return true;
  }
}
