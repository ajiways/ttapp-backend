import { IsString, Length, Matches, IsNotEmpty } from 'class-validator';

export class SaveHeadmanDTO {
  @IsString()
  @Length(4, 16)
  @Matches(/(?!-)(?!.*__)(?!.*-_)(?!.*_-)(?!.*--)^[_a-zA-Z0-9-]+$/)
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
  @Length(8, 32)
  password: string;
}
