import { Field, ObjectType } from '@nestjs/graphql';
import { EmailScalar } from '@src/scalars/email.scalar';

@ObjectType()
export class AuthType {
  @Field()
  email: EmailScalar;

  @Field()
  token: string;
}
