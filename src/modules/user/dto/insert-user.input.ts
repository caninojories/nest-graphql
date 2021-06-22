import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { EmailScalar } from '@scalars/email.scalar';

@InputType()
export class InsertUserInput {
  @Field()
  @IsEmail()
  email: EmailScalar;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
