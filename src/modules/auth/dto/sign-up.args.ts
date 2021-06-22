import { Field, ArgsType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SignupInput } from './sign-up.input';

@ArgsType()
export class SignupArgs {
  @Field(() => SignupInput)
  @Type(() => SignupInput)
  @ValidateNested()
  user: SignupInput;
}
