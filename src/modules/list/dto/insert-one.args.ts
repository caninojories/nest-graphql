import { Field, ArgsType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InsertOneInput } from './insert-one.input';

@ArgsType()
export class InsertOneArgs {
  @Field(() => InsertOneInput)
  @Type(() => InsertOneInput)
  @ValidateNested()
  list: InsertOneInput;
}
