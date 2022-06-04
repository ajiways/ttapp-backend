import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationServiceInterface } from '../interfaces/authentication-service.interface';
import { LoginDTO } from '../dto/login.dto';
import { RegistrationDTO } from '../dto/registration.dto';
import { AuthenticationService } from '../services/authentication.service';
import { TokenResponse } from './common/token-response.interface';
import {
  RequestInterface,
  ResponseInterface,
} from './common/requestResponse.interfaces';
import { Public } from '../guards/authentication.guard';

@Controller('auth')
export class AuthenticationController {
  @Inject(AuthenticationService)
  private readonly authenticationService: AuthenticationServiceInterface;

  @Public()
  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() args: LoginDTO,
    @Res({ passthrough: true }) res: ResponseInterface,
  ): Promise<Omit<TokenResponse, 'refreshToken'>> {
    const response = await this.authenticationService.login(args);

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
    });

    return {
      expiration: response.expiration,
      token: response.token,
      userId: response.userId,
    };
  }

  @Public()
  @HttpCode(201)
  @Post('/registration')
  async registration(
    @Body() args: RegistrationDTO,
    @Res({ passthrough: true }) res: ResponseInterface,
  ): Promise<Omit<TokenResponse, 'refreshToken'>> {
    const response = await this.authenticationService.register(args);

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
    });

    return {
      expiration: response.expiration,
      token: response.token,
      userId: response.userId,
    };
  }

  @HttpCode(200)
  @Get('/logout')
  async logout(
    @Req() req: RequestInterface,
    @Res({ passthrough: true }) res: ResponseInterface,
  ): Promise<void> {
    const refreshToken = req.cookies['refreshToken'];

    await this.authenticationService.logout(refreshToken);

    res.clearCookie('refreshToken');
  }

  @HttpCode(200)
  @Get('/refresh')
  async refresh(@Req() req: RequestInterface): Promise<void> {
    const refreshToken = req.cookies['refreshToken'];
    const userId = req.user.id;

    await this.authenticationService.refresh(refreshToken, userId);
  }
}
