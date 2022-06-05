import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { SaveStudentGroupDTO } from '../dto/save-student-group.dto';
import { StudentGroupEntity } from '../entity/student-groups.entity';

export interface StudentGroupServiceInterface
  extends BaseServiceInterface<StudentGroupEntity> {
  save(
    dto: SaveStudentGroupDTO,
    manager?: EntityManager,
  ): Promise<StudentGroupEntity>;

  delete(id: string, manager?: EntityManager): Promise<boolean>;

  list(
    take: number,
    skip: number,
    manager?: EntityManager,
  ): Promise<StudentGroupEntity[]>;
}
