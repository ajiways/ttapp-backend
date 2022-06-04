import { CookieOptions } from 'express';
import { UserEntity } from '../../../administration/entities/user.entity';

export interface RequestInterface {
  headers: {
    'x-user-id': string | undefined;
    Authorization: string | undefined;
    refreshToken: string | undefined;
  };
  user: UserEntity;
}

export interface ResponseInterface {
  cookie(name: string, val: string, options: CookieOptions): this;
  cookie(name: string, val: string, options: CookieOptions): this;
  cookie(name: string, val: string): this;
  clearCookie(name: string, options?: CookieOptions): this;
}
