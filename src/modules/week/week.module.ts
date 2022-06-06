import { Module } from '@nestjs/common';
import { WeekService } from './services/week.service';
import { WeekController } from './controllers/week.controller';

const services = [WeekService];
const controllers = [WeekController];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class WeekModule {}
