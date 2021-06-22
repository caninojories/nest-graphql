import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { UserRolesEnum } from '@src/shared/enums';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  userRole?: UserRolesEnum;
}
