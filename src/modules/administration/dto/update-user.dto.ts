import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { CompleteToUpdate } from '../../../common/helpers/dto';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDTO implements CompleteToUpdate<UserEntity> {
  @IsOptional()
  @IsString()
  @Length(4, 16)
  @Matches(/(?!-)(?!.*__)(?!.*-_)(?!.*_-)(?!.*--)^[_a-zA-Z0-9-]+$/)
  @IsNotEmpty()
  login?: string | undefined;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
  @Length(8, 32)
  password?: string | undefined;

  @IsUUID('4')
  id: string;
}
