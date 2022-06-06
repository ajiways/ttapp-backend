import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { EDayNames } from '../../../common/enums/schedule.enums';
import { CompleteToUpdate } from '../../../common/helpers/dto';
import { DayEntity } from '../entities/day.entity';

export class UpdateDayDTO implements CompleteToUpdate<DayEntity> {
  @IsEnum(EDayNames)
  title?: EDayNames | undefined;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  order?: number | undefined;

  @IsUUID('4')
  id: string;
}
