import { IsBoolean, IsUUID } from 'class-validator';
import { Complete } from '../../../common/helpers/dto';
import { WeekEntity } from '../entities/week.entity';

export class SaveWeekDTO implements Complete<WeekEntity> {
  @IsBoolean()
  isEven: boolean;

  @IsUUID('4')
  groupId: string;
}
