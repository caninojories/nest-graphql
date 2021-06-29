import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SubscriptionStripeModel, SubscriptionStripeSchema } from '@models';

export const subscriptionStripeSchema: AsyncModelFactory[] = [
  {
    name: SubscriptionStripeModel.name,
    useFactory: (): MongooseSchema => {
      const schema = SubscriptionStripeSchema;

      return schema;
    },
  },
];
