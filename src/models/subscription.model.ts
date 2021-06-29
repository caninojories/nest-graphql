import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';
import { SubscriptionStripeModel } from './subscription-stripe.model';
import { UserModel } from './user.model';

@ObjectType()
@Schema()
export class SubscriptionModel extends Base<SubscriptionModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field(() => UserModel)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => UserModel })
  user: UserModel;

  @Field(() => SubscriptionStripeModel)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => SubscriptionStripeModel,
  })
  stripeSubscription: SubscriptionStripeModel;
}

export type SubscriptionDocument = SubscriptionModel & mongoose.Document;
export const SubscriptionSchema =
  SchemaFactory.createForClass(SubscriptionModel);
