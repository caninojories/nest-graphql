import { ValidationPipe, INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '@src/filters';
import compression from 'compression';

function AppConfig(app: INestApplication): void {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(compression());
}

export default AppConfig;
