import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { StudentGroupService } from './services/student-group.service';
import { StudentGroupController } from './controllers/student-group.controller';
import { AdministrationModule } from '../administration/administration.module';
import { WeekModule } from '../week/week.module';
import { DayModule } from '../day/day.module';
import { LessonModule } from '../lesson/lesson.module';

const controllerts = [GroupController, StudentGroupController];
const services = [GroupService, StudentGroupService, LessonModule];
const modules = [
  forwardRef(() => AdministrationModule),
  WeekModule,
  DayModule,
  LessonModule,
];

@Module({
  imports: [...modules],
  controllers: [...controllerts],
  providers: [...services],
  exports: [...services],
})
export class GroupModule {}
