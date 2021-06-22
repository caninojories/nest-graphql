import { Field, ArgsType } from '@nestjs/graphql';
import { InsertUserInput } from './insert-user.input';

@ArgsType()
export class InsertUserArgs {
  @Field()
  user: InsertUserInput;
}
