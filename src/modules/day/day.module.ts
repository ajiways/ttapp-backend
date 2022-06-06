import { Module } from '@nestjs/common';
import { DayService } from './services/day.service';
import { DayController } from './controllers/day.controller';

const services = [DayService];
const controllers = [DayController];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class DayModule {}
