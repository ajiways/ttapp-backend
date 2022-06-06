import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { Complete } from '../../../common/helpers/dto';
import { GroupEntity } from '../entities/group.entity';

export class SaveGroupDTO implements Complete<GroupEntity> {
  @IsUUID('4')
  headmanId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  title: string;
}
