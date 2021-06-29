import { IsString, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinkedInType {
  @Field()
  @IsString()
  @IsNotEmpty()
  URL: string;
}
