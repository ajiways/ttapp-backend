import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { ELessonType } from '../../../common/enums/schedule.enums';
import { CompleteToUpdate } from '../../../common/helpers/dto';
import { LessonEntity } from '../entities/lesson.entity';

export class UpdateLessonDTO implements CompleteToUpdate<LessonEntity> {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title: string | undefined;

  @IsOptional()
  @IsEnum(ELessonType)
  type: ELessonType | undefined;

  @IsOptional()
  @IsString()
  @MinLength(5)
  teacher: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(2)
  cabinetNumber: string | undefined;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startDate: string | undefined;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endDate: string | undefined;

  @IsOptional()
  @IsNumber()
  @Min(1)
  order: number | undefined;

  @IsUUID('4')
  dayId: string;

  @IsUUID('4')
  id: string;
}
