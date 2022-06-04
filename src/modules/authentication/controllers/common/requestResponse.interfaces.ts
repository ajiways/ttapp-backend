import { CookieOptions } from 'express';

export interface RequestInterface {
  headers: {
    'x-user-id': string | undefined;
    Authorization: string | undefined;
    refreshToken: string | undefined;
  };
}

export interface ResponseInterface {
  cookie(name: string, val: string, options: CookieOptions): this;
  cookie(name: string, val: string, options: CookieOptions): this;
  cookie(name: string, val: string): this;
  clearCookie(name: string, options?: CookieOptions): this;
}
