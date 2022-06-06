import { IsUUID } from 'class-validator';
import { CompleteToUpdate } from '../../../common/helpers/dto';
import { WeekEntity } from '../entities/week.entity';

export class UpdateWeekDTO
  implements CompleteToUpdate<Omit<WeekEntity, 'isEven' | 'groupId'>>
{
  @IsUUID('4')
  id: string;
}
