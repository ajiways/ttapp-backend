import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { EntityIdDTO } from '../../../common/helpers/entity/entity-id.dto';
import { SaveHeadmanDTO } from '../dto/create-headman.dto';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateSelfPasswordDTO } from '../dto/update-self-password.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserServiceInterface extends BaseServiceInterface<UserEntity> {
  save(
    dto: CreateUserDTO,
    manager?: EntityManager,
    user?: UserEntity,
  ): Promise<UserEntity & { groupId: string }>;

  update(
    dto: UpdateUserDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<UserEntity>;

  createHeadman(
    dto: SaveHeadmanDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<UserEntity>;

  findAll(manager?: EntityManager): Promise<UserEntity[]>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  findByLogin(
    login: string,
    manager?: EntityManager,
  ): Promise<UserEntity | undefined>;

  findByIdNoError(
    id: string,
    manager?: EntityManager,
  ): Promise<UserEntity | undefined>;

  updateSelfPassword(
    dto: UpdateSelfPasswordDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  updateSelfGroup(
    dto: EntityIdDTO,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;
}
