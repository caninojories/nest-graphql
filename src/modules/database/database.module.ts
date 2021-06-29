import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserModel,
  UserSchema,
  CompanyModel,
  CompanySchema,
  FilterModel,
  FilterSchema,
  ContactModel,
  ContactSchema,
  ListModel,
  ListSchema,
  CreditModel,
  CreditSchema,
  CreditHistoryModel,
  CreditHistorySchema,
  SubscriptionModel,
  SubscriptionSchema,
  SubscriptionStripeModel,
  SubscriptionStripeSchema,
} from '@models';
import config from 'config';
import { userSchema } from './user.schema';
import { contactSchema } from './contact.schema';
import { companySchema } from './company.schema';
import { filterSchema } from './filter.schema';
import { listSchema } from './list.schema';
import { creditSchema } from './credit.schema';
import { creditHistorySchema } from './credit-history.schema';
import { subscriptionSchema } from './subscription.schema';
import { subscriptionStripeSchema } from './subscription-stripe.schema';

const mongoDbConfig = config.get('mongoDb');
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      ...userSchema,
      ...companySchema,
      ...contactSchema,
      ...filterSchema,
      ...listSchema,
      ...creditSchema,
      ...creditHistorySchema,
      ...subscriptionSchema,
      ...subscriptionStripeSchema,
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema,
      },
      {
        name: CompanyModel.name,
        schema: CompanySchema,
      },
      {
        name: ContactModel.name,
        schema: ContactSchema,
      },
      {
        name: FilterModel.name,
        schema: FilterSchema,
      },
      {
        name: ListModel.name,
        schema: ListSchema,
      },
      {
        name: CreditModel.name,
        schema: CreditSchema,
      },
      {
        name: CreditHistoryModel.name,
        schema: CreditHistorySchema,
      },
      {
        name: SubscriptionModel.name,
        schema: SubscriptionSchema,
      },
      {
        name: SubscriptionStripeModel.name,
        schema: SubscriptionStripeSchema,
      },
    ]),
  ],
})
export class DatabaseModule {}

export const Database = MongooseModule.forRoot(mongoDbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
