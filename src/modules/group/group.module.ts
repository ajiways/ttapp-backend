import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { StudentGroupService } from './services/student-group.service';
import { StudentGroupController } from './controllers/student-group.controller';
import { AdministrationModule } from '../administration/administration.module';

const controllerts = [GroupController, StudentGroupController];
const services = [GroupService, StudentGroupService];
const modules = [forwardRef(() => AdministrationModule)];

@Module({
  imports: [...modules],
  controllers: [...controllerts],
  providers: [...services],
  exports: [...services],
})
export class GroupModule {}