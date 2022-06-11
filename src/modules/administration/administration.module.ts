import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { GroupModule } from '../group/group.module';
import { PermissionRolesService } from './services/permission-roles.service';
import { RolesService } from './services/roles.service';
import { UserRolesService } from './services/user-roles.service';
import { PermissionService } from './services/permissions.service';

const controllers = [UserController];
const modules = [forwardRef(() => GroupModule)];
const services = [
  UserService,
  PermissionRolesService,
  RolesService,
  UserRolesService,
  PermissionService,
];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class AdministrationModule {}
