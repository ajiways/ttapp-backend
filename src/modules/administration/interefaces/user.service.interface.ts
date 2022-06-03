import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserServiceInterface extends BaseServiceInterface<UserEntity> {
  save(dto: CreateUserDTO, manager?: EntityManager): Promise<UserEntity>;
  update(dto: UpdateUserDTO, manager?: EntityManager): Promise<UserEntity>;
  findAll(manager?: EntityManager): Promise<UserEntity[]>;
  delete(id: string, manager?: EntityManager): Promise<boolean>;
}
