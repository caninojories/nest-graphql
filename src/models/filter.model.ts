import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';

@ObjectType()
export class Category {
  @Field()
  name: string;

  @Field()
  code: string;
}

@ObjectType()
export class SubFilter {
  @Field(() => [String]) // by Industry Category
  category: string[];

  @Field(() => [String])
  sic: string[];

  @Field(() => [String])
  naics: string[];
}

@ObjectType()
@Schema()
export class FilterModel extends Base<FilterModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({ require: true, unique: true })
  name: string;

  @Field()
  @Prop({ require: true })
  description?: string;

  @Field(() => SubFilter)
  @Prop(
    raw({
      category: { type: [String] },
      sic: { type: [String] },
      naics: { type: [String] },
    }),
  )
  subFilter: SubFilter;
}

export type FilterDocument = FilterModel & mongoose.Document;
export const FilterSchema = SchemaFactory.createForClass(FilterModel);
