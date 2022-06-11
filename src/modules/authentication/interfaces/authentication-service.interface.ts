import { EntityManager } from 'typeorm';
import { RoleEntity } from '../../administration/entities/role.entity';
import { TokenResponse } from '../controllers/common/token-response.interface';
import { LoginDTO } from '../dto/login.dto';
import { RegistrationDTO } from '../dto/registration.dto';

export interface AuthenticationServiceInterface {
  login(dto: LoginDTO, manager?: EntityManager): Promise<TokenResponse>;
  register(
    dto: RegistrationDTO,
    manager?: EntityManager,
  ): Promise<TokenResponse & { groupId: string }>;
  refresh(
    refreshToken: string | undefined,
    userId: string | undefined,
    manager?: EntityManager,
  ): Promise<{
    expiration: string;
    userId: string;
    token: string;
    refreshToken: string;
    userRoles: RoleEntity[];
  }>;
  logout(
    refreshToken: string | undefined,
    manager?: EntityManager,
  ): Promise<void>;
}
