import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';

@ObjectType()
@Schema()
export class CreditHistoryModel extends Base<CreditHistoryModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  amount: number;

  @Field()
  @Prop({ required: true })
  value: number;

  @Field()
  @Prop({ required: true, type: Date })
  updateAt: Date;
}

export type CreditHistoryModelDocument = CreditHistoryModel & mongoose.Document;
export const CreditHistorySchema =
  SchemaFactory.createForClass(CreditHistoryModel);
