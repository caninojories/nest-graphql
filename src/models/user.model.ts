import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { isEmail } from 'class-validator';
import { EmailScalar } from '@scalars/email.scalar';
import Base from './base.model';

@ObjectType()
export class Linkedin {
  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;
}

@ObjectType()
@Schema()
export class UserModel extends Base<UserModel> {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop({
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid Field: Not a valid email address'],
  })
  email: EmailScalar;

  @Field()
  @Prop()
  password?: string;

  @Field()
  @Prop({ required: true })
  firstName: string;

  @Field()
  @Prop({ required: true })
  lastName: string;

  @Field()
  @Prop()
  phoneNumber?: string;

  @Field(() => Linkedin)
  @Prop(
    raw({
      accessToken: { type: String },
      expiresIn: { type: Number },
    }),
  )
  linkedin?: Linkedin;
}

export type UserDocument = UserModel & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);
