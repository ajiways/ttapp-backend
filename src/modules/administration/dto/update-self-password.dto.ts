import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateSelfPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
  @Length(8, 32)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
  @Length(8, 32)
  newPassword: string;
}
