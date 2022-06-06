import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeORMConfig from '../common/config/typeorm/typeorm.config';
import EnvConfig from '../common/config/environment.config';
import { ConfigurationModule } from '../common/configuration/configuration.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { IncomingRequestInterceptor } from '../common/interceptors/incoming-request.interceptor';
import { DEFAULT_CONNECTION } from '../common/typeorm/connections';
import { ConfigurationService } from '../common/configuration/configuration.service';
import { AdministrationModule } from './administration/administration.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { GroupModule } from './group/group.module';
import { AppController } from './app.controller';
import { WeekModule } from './week/week.module';
import { DayModule } from './day/day.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig, typeORMConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (config: ConfigurationService) =>
        config.typeorm(DEFAULT_CONNECTION),
      inject: [ConfigurationService],
    }),
    AdministrationModule,
    AuthenticationModule,
    GroupModule,
    WeekModule,
    DayModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: IncomingRequestInterceptor },
  ],
})
export class MainModule {}
