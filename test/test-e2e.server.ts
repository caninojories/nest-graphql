import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import AppConfig from '../src/main.config';

export async function TestE2EServer(props: {
  imports: [...any];
  providers: [...any];
}): Promise<{
  app: INestApplication;
  moduleFixture: TestingModule;
}> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule, ...props.imports],
    providers: [...props.providers],
  }).compile();

  const app = moduleFixture.createNestApplication();
  AppConfig(app);
  await app.init();

  return { app, moduleFixture };
}
