import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SubscriptionModel, SubscriptionSchema } from '@models';

export const subscriptionSchema: AsyncModelFactory[] = [
  {
    name: SubscriptionModel.name,
    useFactory: (): MongooseSchema => {
      const schema = SubscriptionSchema;

      return schema;
    },
  },
];
