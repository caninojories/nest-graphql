import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { EmailScalar } from '@scalars/email.scalar';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserResolver, EmailScalar],
  exports: [UserService],
})
export class UserModule {}
