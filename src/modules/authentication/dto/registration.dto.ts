import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDTO } from '../../administration/dto/create-user.dto';

export class RegistrationDTO extends CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
