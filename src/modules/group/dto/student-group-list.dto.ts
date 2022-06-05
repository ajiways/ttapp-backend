import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

type TTransformValue = { value: string };

export class StudentGroupListDTO {
  @Transform(({ value }: TTransformValue) => (value ? +value : 1))
  @IsNumber()
  @Min(1)
  take: number;

  @Transform(({ value }: TTransformValue) => (value ? +value : 0))
  @IsNumber()
  @Min(0)
  skip: number;
}
