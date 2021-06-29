import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import AppConfig from './main.config';

const env = config.get('NODE_ENV');
const port = config.get('PORT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  AppConfig(app);
  app.use(
    helmet({
      contentSecurityPolicy: env === 'production' ? undefined : false,
    }),
  );
  app.listen(port, () => {
    Logger.log(`Listening to port ${port}`);
  });
}
bootstrap();
