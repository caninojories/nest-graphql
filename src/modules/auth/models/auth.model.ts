import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';
import { EmailScalar } from '@src/scalars/email.scalar';

@ObjectType()
export class Auth {
  @Field()
  @IsEmail()
  email: EmailScalar;

  @Field()
  @IsString()
  @IsNotEmpty()
  token: string;
}
