import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Database } from '@modules/database/database.module';
import { ListModule } from '@modules/list/list.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  imports: [
    Database,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: true,
      path: '/graphql/api',
      context: ({ req, res }) => ({ req, res }),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'interface',
      },
    }),
    UserModule,
    AuthModule,
    HealthModule,
    ListModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
