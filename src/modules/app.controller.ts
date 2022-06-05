import { Controller, Get } from '@nestjs/common';
import { Public } from './authentication/guards/authentication.guard';

@Controller()
export class AppController {
  @Get('/ping')
  @Public()
  ping() {
    return 'pong';
  }
}
