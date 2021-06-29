import { Test, TestingModule } from '@nestjs/testing';
import { TestDatabaseModule } from './test-database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from '@modules/database/user.schema';

export async function TestServer(options: {
  imports?: [...any];
  providers?: [...any];
}): Promise<{
  moduleRef: TestingModule;
}> {
  const moduleRef: TestingModule = await Test.createTestingModule({
    imports: [
      TestDatabaseModule,
      MongooseModule.forFeatureAsync([...userSchema]),
      ...options.imports,
    ],
    providers: [...options.providers],
  }).compile();

  return { moduleRef };
}
