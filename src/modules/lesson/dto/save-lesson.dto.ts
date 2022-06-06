import {
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { ELessonType } from '../../../common/enums/schedule.enums';
import { Complete } from '../../../common/helpers/dto';
import { LessonEntity } from '../entities/lesson.entity';

export class SaveLessonDTO implements Complete<LessonEntity> {
  @IsString()
  @MinLength(5)
  title: string;

  @IsEnum(ELessonType)
  type: ELessonType;

  @IsString()
  @MinLength(5)
  teacher: string;

  @IsString()
  @MinLength(2)
  cabinetNumber: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startDate: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endDate: string;

  @IsNumber()
  @Min(1)
  order: number;

  @IsUUID('4')
  dayId: string;
}
