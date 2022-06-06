import { IsEnum, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { EDayNames } from '../../../common/enums/schedule.enums';
import { Complete } from '../../../common/helpers/dto';
import { DayEntity } from '../entities/day.entity';

export class SaveDayDTO implements Complete<DayEntity> {
  @IsEnum(EDayNames)
  title: EDayNames;

  @IsNumber()
  @Min(1)
  @Max(7)
  order: number;

  @IsUUID('4')
  weekId: string;
}
