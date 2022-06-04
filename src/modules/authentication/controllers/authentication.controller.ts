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
import { Request, Response } from 'express';

@Controller('auth')
export class AuthenticationController {
  @Inject(AuthenticationService)
  private readonly authenticationService: AuthenticationServiceInterface;

  @HttpCode(200)
  @Post('/login')
  async login(
    @Body() args: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<TokenResponse, 'refreshToken'>> {
    const response = await this.authenticationService.login(args);

    res.cookie('refreshToken', response.refreshToken);

    return {
      expiration: response.expiration,
      token: response.token,
      userId: response.userId,
    };
  }

  @HttpCode(201)
  @Post('/registration')
  async registration(
    @Body() args: RegistrationDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Omit<TokenResponse, 'refreshToken'>> {
    const response = await this.authenticationService.register(args);

    res.cookie('refreshToken', response.refreshToken);

    return {
      expiration: response.expiration,
      token: response.token,
      userId: response.userId,
    };
  }

  @HttpCode(200)
  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const refreshToken = req.headers['refreshToken'] as string | undefined;

    await this.authenticationService.logout(refreshToken);

    res.clearCookie('refreshToken');
    res.json({ done: true });
  }

  @HttpCode(200)
  @Get('/refresh')
  async refresh(@Req() req: Request): Promise<void> {
    const refreshToken = req.headers['refreshToken'] as string | undefined;
    const userId = req.headers['x-user-id'] as string | undefined;

    await this.authenticationService.refresh(refreshToken, userId);
  }
}
