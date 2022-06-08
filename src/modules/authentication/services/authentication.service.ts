import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
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
import { StudentGroupService } from '../../group/services/student-group.service';
import { StudentGroupServiceInterface } from '../../group/interfaces/student-group.service.interface';
import { GroupService } from '../../group/services/group.service';

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

  @Inject(StudentGroupService)
  private studentGroupService: StudentGroupServiceInterface;

  @Inject(RefreshTokenService)
  private readonly refreshTokenService: RefreshTokenServiceInterface;

  @Inject(GroupService)
  private readonly groupService: StudentGroupServiceInterface;

  async validateToken(token: TAuthenticationToken): Promise<UserEntity | null> {
    const user = await this.usersService.findByIdNoError(token.id);
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

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.env.REFRESH_AUTHENTICATION_TOKEN_SECRET,
      expiresIn: this.configService.env.REFRESH_AUTHENTICATION_TOKEN_EXPIRES_IN,
    });

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
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new BadRequestException(`User does not exists`);
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched) {
      const tokenData = await this.generateToken(user);
      const userStudentGroup = await this.studentGroupService.findOneWhere({
        studentId: user.id,
      });

      if (!userStudentGroup) {
        throw new InternalServerErrorException(`User doesn't have a group`);
      }

      const group = await this.groupService.findById(userStudentGroup.groupId);

      return {
        ...tokenData,
        groupId: group.id,
      };
    } else {
      throw new BadRequestException(`Wrong login or password`);
    }
  }

  async register(
    dto: RegistrationDTO,
  ): Promise<TokenResponse & { groupId: string }> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(`Password and password confirm mismatches`);
    }

    const user = await this.usersService.save(dto);

    const tokenData = await this.generateToken(user);

    return {
      ...tokenData,
      groupId: user.groupId,
    };
  }

  async refresh(
    refreshToken: string | undefined,
    userId: string | undefined,
  ): Promise<{
    expiration: string;
    userId: string;
    token: string;
    refreshToken: string;
  }> {
    if (!refreshToken || !userId) {
      throw new BadRequestException('User id refresh token was not provided');
    }

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.env.REFRESH_AUTHENTICATION_TOKEN_SECRET,
      });
    } catch (e) {
      const existingToken = await this.refreshTokenService.findByUserId(userId);

      if (existingToken) {
        await this.refreshTokenService.delete(existingToken);
      }

      throw new UnauthorizedException(`Refresh token is expired`);
    }

    let existingToken = await this.refreshTokenService.findByRefreshToken(
      refreshToken,
    );

    if (!existingToken) {
      existingToken = await this.refreshTokenService.findByUserId(userId);

      if (!existingToken) {
        throw new UnauthorizedException(`Token isn't valid`);
      }
    }

    const user = await this.usersService.findById(userId);

    return await this.generateToken(user, existingToken);
  }

  async logout(refreshToken: string | undefined): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedException('To log out log in first');
    }

    const existingToken = await this.refreshTokenService.findByRefreshToken(
      refreshToken,
    );

    if (!existingToken) {
      return;
    }

    await this.refreshTokenService.delete(existingToken);
  }
}
