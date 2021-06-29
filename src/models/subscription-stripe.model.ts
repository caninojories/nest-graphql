import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';

@ObjectType()
@Schema()
export class SubscriptionStripeModel extends Base<SubscriptionStripeModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field()
  @Prop({ required: true })
  cost: number;
}

export type SubscriptionStripeDocument = SubscriptionStripeModel &
  mongoose.Document;
export const SubscriptionStripeSchema = SchemaFactory.createForClass(
  SubscriptionStripeModel,
);
