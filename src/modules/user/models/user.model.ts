import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { EmailScalar } from '@scalars/email.scalar';
import { UserRolesEnum } from '@shared/enums';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id?: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  @IsEmail()
  email: EmailScalar;

  @Field()
  @Prop()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @Prop()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @Prop()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @Prop()
  @IsOptional()
  userRole?: UserRolesEnum;

  assimilate(user: Omit<User, 'assimilate'>) {
    for (const key in user) {
      this[key] = user[key];
    }
  }
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
