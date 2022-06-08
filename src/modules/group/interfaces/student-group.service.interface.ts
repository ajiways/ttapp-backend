import { EntityManager, FindConditions } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { UserEntity } from '../../administration/entities/user.entity';
import { SaveStudentGroupDTO } from '../dto/save-student-group.dto';
import { StudentGroupEntity } from '../entities/student-groups.entity';

export interface StudentGroupServiceInterface
  extends BaseServiceInterface<StudentGroupEntity> {
  save(
    dto: SaveStudentGroupDTO,
    manager?: EntityManager,
    user?: UserEntity,
  ): Promise<StudentGroupEntity>;

  delete(
    id: string,
    user: UserEntity,
    manager?: EntityManager,
  ): Promise<boolean>;

  list(
    take: number,
    skip: number,
    manager?: EntityManager,
  ): Promise<StudentGroupEntity[]>;

  findOneWhere(
    where: FindConditions<StudentGroupEntity>,
    manager?: EntityManager,
  ): Promise<StudentGroupEntity | undefined>;
}
