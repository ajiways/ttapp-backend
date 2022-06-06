import { IsOptional, IsUUID } from 'class-validator';
import { Complete } from '../../../common/helpers/dto';
import { StudentGroupEntity } from '../entities/student-groups.entity';

export class SaveStudentGroupDTO implements Complete<StudentGroupEntity> {
  @IsUUID('4')
  studentId: string;

  @IsUUID('4')
  groupId: string;

  @IsOptional()
  @IsUUID('4')
  id?: string | undefined;
}
