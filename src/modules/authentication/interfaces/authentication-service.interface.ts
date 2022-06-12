import { EntityManager } from 'typeorm';
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
  ): Promise<Omit<TokenResponse, 'groupId'>>;

  logout(
    refreshToken: string | undefined,
    manager?: EntityManager,
  ): Promise<void>;
}
