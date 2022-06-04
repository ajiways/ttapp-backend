import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigurationService } from './common/configuration/configuration.service';
import { MainModule } from './modules/main.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  app.use(cookieParser());

  app.useGlobalGuards(app.get('AuthenticationGuard'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config: ConfigurationService = app.get(ConfigurationService);

  await app.listen(
    Number(config.env.APP_PORT),
    //FIXME: wtf
    String(config.env.APP_HOST).replace('}', '').replace('{', ''),
  );
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
