import { IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { CompleteToUpdate } from '../../../common/helpers/dto';
import { GroupEntity } from '../entities/group.entity';

export class UpdateGroupDTO implements CompleteToUpdate<GroupEntity> {
  @IsOptional()
  @IsUUID('4')
  headmanId?: string | undefined;

  @IsOptional()
  @IsString()
  @Length(2, 5)
  title?: string | undefined;
  id: string;
}
