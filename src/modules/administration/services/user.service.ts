import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { EntityManager } from 'typeorm';
import { AbstractService } from '../../../common/services/abstract.service';
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

  protected async validateEntitiesBeforeSave(): Promise<void> {
    //TODO: nothing to do
  }

  async save(
    dto: CreateUserDTO,
    manager: EntityManager | undefined,
  ): Promise<UserEntity> {
    if (!manager) {
      return this.startTransaction((manager) => this.save(dto, manager));
    }

    const candidates = await this.findOneWhere({ login: dto.login }, manager);

    if (candidates) {
      throw new BadRequestException(
        `User with login ${dto.login} already exists`,
      );
    }

    return await this.saveEntity(
      {
        login: dto.login,
        password: await hash(dto.password, 7),
      },
      manager,
    );
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
}
