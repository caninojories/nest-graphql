import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import Base from './base.model';
import { CompanyModel } from './company.model';

@ObjectType()
@Schema()
export class ContactModel extends Base<ContactModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  lastName: string;

  @Field({ nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: CompanyModel.name })
  company?: CompanyModel;
}

export type ContactDocument = ContactModel & mongoose.Document;
export const ContactSchema = SchemaFactory.createForClass(ContactModel);
