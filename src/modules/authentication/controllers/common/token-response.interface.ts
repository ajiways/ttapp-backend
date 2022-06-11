import { RoleEntity } from '../../../administration/entities/role.entity';

export interface TokenResponse {
  expiration: string;
  userId: string;
  token: string;
  groupId: string;
  refreshToken: string;
  userRoles: RoleEntity[];
}
