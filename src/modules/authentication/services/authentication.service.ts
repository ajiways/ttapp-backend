import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { ConfigurationService } from '../../../common/configuration/configuration.service';
import { UserEntity } from '../../administration/entities/user.entity';
import { UserService } from '../../administration/services/user.service';
import { AuthenticationServiceInterface } from '../interfaces/authentication-service.interface';
import { TokenResponse } from '../controllers/common/token-response.interface';
import { LoginDTO } from '../dto/login.dto';
import { RegistrationDTO } from '../dto/registration.dto';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';
import { UserServiceInterface } from '../../administration/interefaces/user.service.interface';
import { RefreshTokenServiceInterface } from '../interfaces/refresh-token.service.interface';

export type TAuthenticationToken = {
  id: string;
  login: string;
  expiration: string;
};

@Injectable()
export class AuthenticationService implements AuthenticationServiceInterface {
  @Inject(UserService)
  private usersService: UserServiceInterface;

  @Inject()
  private configService: ConfigurationService;

  @Inject()
  private jwtService: JwtService;

  @Inject(RefreshTokenService)
  private readonly refreshTokenService: RefreshTokenServiceInterface;

  async validateToken(token: TAuthenticationToken): Promise<UserEntity | null> {
    const user = await this.usersService.findByIdOrNull(token.id);
    return user ?? null;
  }

  async generateToken(user: UserEntity, existingToken?: RefreshTokenEntity) {
    const expiresIn = this.configService.env.AUTHENTICATION_TOKEN_EXPIRES_IN;
    const now = Date.now();
    const expiration = new Date(now + expiresIn * 1000);
    const expirationString = expiration.toISOString();
    const userId = user.id;
    const payload: TAuthenticationToken = {
      id: userId,
      login: user.login,
      expiration: expirationString,
    };

    const refreshToken = await this.jwtService.signAsync(payload);

    if (existingToken) {
      await this.refreshTokenService.save({
        id: existingToken.id,
        user,
        refreshToken,
      });
    } else {
      await this.refreshTokenService.save({ refreshToken, user });
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      expiration: expirationString,
      userId,
      token,
      refreshToken,
    };
  }

  async login(dto: LoginDTO): Promise<TokenResponse> {
    const { login, password } = dto;
    const user = await this.usersService.findOneWhere({ login });

    if (!user) {
      throw new BadRequestException(`User does not exists`);
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) {
      return await this.generateToken(user);
    } else {
      throw new BadRequestException(`Wrong login or password`);
    }
  }

  async register(dto: RegistrationDTO): Promise<TokenResponse> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(`Password and password confirm mismatches`);
    }

    const user = await this.usersService.save(dto);

    return await this.generateToken(user);
  }

  async refresh(
    refreshToken: string | undefined,
    userId: string | undefined,
  ): Promise<{
    expiration: string;
    userId: string;
    token: string;
  }> {
    if (!refreshToken || !userId) {
      throw new BadRequestException('User id refresh token was not provided');
    }

    const existingToken = await this.refreshTokenService.findOneWhere({
      refreshToken,
    });

    if (!existingToken) {
      throw new UnauthorizedException(`Token isn't valid`);
    }

    const decodedData = this.jwtService.decode(refreshToken) as {
      userId: string;
    };

    const user = await this.usersService.findById(decodedData.userId);

    return await this.generateToken(user, existingToken);
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException('To log out log in first');
    }

    const existingToken = await this.refreshTokenService.findOneWhere({
      refreshToken,
    });

    if (!existingToken) {
      return;
    }

    await this.refreshTokenService.deleteEntities([existingToken]);
  }
}