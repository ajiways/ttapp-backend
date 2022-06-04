import { ForbiddenException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthenticationService,
  TAuthenticationToken,
} from './services/authentication.service';
import { ConfigurationService } from '../../common/configuration/configuration.service';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthenticationService,
    configService: ConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.env.AUTHENTICATION_TOKEN_SECRET,
    });
  }

  async validate(token: TAuthenticationToken) {
    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new ForbiddenException(`Invalid token`);
    }
    return user;
  }
}
