import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

const controllers = [UserController];

const services = [UserService];

@Module({
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class AdministrationModule {}
