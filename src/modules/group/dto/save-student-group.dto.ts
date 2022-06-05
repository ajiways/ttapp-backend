import { IsUUID } from 'class-validator';
import { Complete } from '../../../common/helpers/dto';
import { StudentGroupEntity } from '../entity/student-groups.entity';

export class SaveStudentGroupDTO implements Complete<StudentGroupEntity> {
  @IsUUID('4')
  studentId: string;

  @IsUUID('4')
  groupId: string;
}
