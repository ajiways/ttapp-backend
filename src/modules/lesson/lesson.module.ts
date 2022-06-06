import { Module } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { LessonController } from './controllers/lesson.controller';

const controllers = [LessonController];
const servies = [LessonService];

@Module({
  controllers: [...controllers],
  providers: [...servies],
  exports: [...servies],
})
export class LessonModule {}
