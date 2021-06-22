import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from '@src/filters';
import helmet from 'helmet';
import compression from 'compression';

const env = config.get('NODE_ENV');
const port = config.get('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    helmet({
      contentSecurityPolicy: env === 'production' ? undefined : false,
    }),
  );
  app.use(compression());
  app.listen(port, () => {
    Logger.log(`Listening to port ${port}`);
  });
}
bootstrap();
