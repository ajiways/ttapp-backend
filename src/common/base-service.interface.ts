import { EntityManager, FindConditions } from 'typeorm';
import { TFindExtraParams } from './services/abstract.service';

export interface BaseServiceInterface<T> {
  findWhere(
    conditions: FindConditions<T> | FindConditions<T>[],
    manager?: EntityManager,
  ): Promise<T[]>;

  findByIds(ids: string[]): Promise<T[]>;

  findById(id: string, manager?: EntityManager): Promise<T>;

  findByIdOrNull(id: string, manager?: EntityManager): Promise<T | undefined>;

  findOneWhere(
    where: FindConditions<T> | FindConditions<T>[],
    manager?: EntityManager,
    extra?: TFindExtraParams<T>,
  ): Promise<T | undefined>;

  deleteEntities(
    where: FindConditions<T> | FindConditions<T>[],
    manager?: EntityManager,
  ): Promise<boolean>;
}
