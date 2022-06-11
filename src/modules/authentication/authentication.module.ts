import { Module } from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { ConfigurationModule } from '../../common/configuration/configuration.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationService } from '../../common/configuration/configuration.service';
import { AdministrationModule } from '../administration/administration.module';
import { RefreshTokenService } from './services/refresh-token.service';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthenticationStrategy } from './authentication.strategy';
import { GroupModule } from '../group/group.module';
import { RolesGuard } from './guards/roles.guard';

const modules = [AdministrationModule, GroupModule];

const services = [
  AuthenticationService,
  RefreshTokenService,
  AuthenticationGuard,
  AuthenticationStrategy,
  RolesGuard,
];

@Module({
  imports: [
    ConfigurationModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => {
        const { AUTHENTICATION_TOKEN_SECRET, AUTHENTICATION_TOKEN_EXPIRES_IN } =
          configService.env;
        return {
          secret: AUTHENTICATION_TOKEN_SECRET,
          signOptions: {
            expiresIn: AUTHENTICATION_TOKEN_EXPIRES_IN * 1000,
          },
        };
      },
      inject: [ConfigurationService],
    }),
    ...modules,
  ],
  controllers: [AuthenticationController],
  providers: [...services],
  exports: [...services],
})
export class AuthenticationModule {}
