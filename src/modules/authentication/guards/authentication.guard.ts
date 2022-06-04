import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getHandler().name === 'login') {
      return true;
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest<Request>();
  }

  handleRequest(err: Error, user: Record<any, any>) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
