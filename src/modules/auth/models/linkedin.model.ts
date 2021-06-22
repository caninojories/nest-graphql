import { IsString, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinkedIn {
  @Field()
  @IsString()
  @IsNotEmpty()
  URL: string;
}
