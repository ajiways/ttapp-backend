import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { GroupModule } from '../group/group.module';

const controllers = [UserController];
const modules = [forwardRef(() => GroupModule)];
const services = [UserService];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class AdministrationModule {}
