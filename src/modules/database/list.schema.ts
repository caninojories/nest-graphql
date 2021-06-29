import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ListModel, ListSchema } from '@models';

export const listSchema: AsyncModelFactory[] = [
  {
    name: ListModel.name,
    useFactory: (): MongooseSchema => {
      const schema = ListSchema;

      return schema;
    },
  },
];
