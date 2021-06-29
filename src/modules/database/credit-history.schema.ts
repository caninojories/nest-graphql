import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CreditHistoryModel, CreditHistorySchema } from '@models';

export const creditHistorySchema: AsyncModelFactory[] = [
  {
    name: CreditHistoryModel.name,
    useFactory: (): MongooseSchema => {
      const schema = CreditHistorySchema;

      return schema;
    },
  },
];
