import { Field, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';

@InputType()
export class InsertOneInput {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  count!: number;

  @Field()
  @IsNotEmpty()
  lastName!: string;

  @Field(() => [String])
  @IsMongoId({ each: true })
  filters!: mongoose.Types.ObjectId[];
}
