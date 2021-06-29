import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';
import { UserModel } from './user.model';
import { FilterModel } from './filter.model';

@ObjectType()
@Schema()
export class ListModel extends Base<ListModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({ require: true })
  name: string;

  @Field()
  @Prop({ required: true, default: 0 })
  timesDownloaded: number;

  @Field()
  @Prop({ required: true }) // leads number for this list (how many result set)
  count: number;

  @Field(() => UserModel)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: UserModel.name,
  })
  user: UserModel;

  @Field(() => [FilterModel])
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: FilterModel.name,
  })
  filters: FilterModel[];
}

export type ListDocument = ListModel & mongoose.Document;
export const ListSchema = SchemaFactory.createForClass(ListModel);
