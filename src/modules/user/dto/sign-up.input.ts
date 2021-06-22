import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
// import { UserRolesEnum } from '@src/shared/enums';
import { EmailScalar } from 'src/scalars/email.scalar';

@InputType()
export class SignupInput {
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
