import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';
import { UserModel } from './user.model';
import { CreditHistoryModel } from './credit-history.model';

@ObjectType()
@Schema()
export class CreditModel extends Base<CreditModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({ required: true, default: 0 })
  totalCredits: number;

  @Field()
  @Prop({ required: true, default: 0 })
  useCredits: number;

  @Field(() => UserModel)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModel.name,
  })
  user: UserModel;

  @Field(() => [CreditHistoryModel])
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: CreditHistoryModel.name,
  })
  creditHistory: CreditHistoryModel[];
}

export type CreditDocument = CreditModel & mongoose.Document;
export const CreditSchema = SchemaFactory.createForClass(CreditModel);
