import { Field, ArgsType } from '@nestjs/graphql';
import { SignupInput } from './sign-up.input';

@ArgsType()
export class SignupArgs {
  @Field()
  user: SignupInput;
}
