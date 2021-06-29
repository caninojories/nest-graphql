import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/database.module';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';

@Module({
  imports: [DatabaseModule],
  providers: [ListResolver, ListService],
})
export class ListModule {}
