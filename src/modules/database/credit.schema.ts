import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CreditModel, CreditSchema } from '@models';

export const creditSchema: AsyncModelFactory[] = [
  {
    name: CreditModel.name,
    useFactory: (): MongooseSchema => {
      const schema = CreditSchema;

      return schema;
    },
  },
];
