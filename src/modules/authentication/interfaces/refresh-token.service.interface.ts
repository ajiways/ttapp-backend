import { EntityManager } from 'typeorm';
import { BaseServiceInterface } from '../../../common/base-service.interface';
import { SaveRefreshTokenDTO } from '../dto/save-refresh-token.dto';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';

export interface RefreshTokenServiceInterface
  extends BaseServiceInterface<RefreshTokenEntity> {
  save(
    dto: SaveRefreshTokenDTO,
    manager?: EntityManager,
  ): Promise<RefreshTokenEntity>;
}
