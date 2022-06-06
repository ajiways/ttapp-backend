import { Module } from '@nestjs/common';
import { WeekService } from './services/week.service';
import { WeekController } from './controllers/week.controller';
import { DayModule } from '../day/day.module';

const services = [WeekService];
const controllers = [WeekController];
const modules = [DayModule];

@Module({
  imports: [...modules],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class WeekModule {}
