import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';
import Base from './base.model';

@ObjectType()
export class Industry {
  @Field() // by Industry category
  category: string;

  @Field()
  sic: string;

  @Field()
  naics: string;
}

@ObjectType()
@Schema()
export class CompanyModel extends Base<CompanyModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  @IsNotEmpty()
  name?: string;

  @Field()
  @Prop()
  industry?: Industry;
}

export type CompanyDocument = CompanyModel & mongoose.Document;
export const CompanySchema = SchemaFactory.createForClass(CompanyModel);
