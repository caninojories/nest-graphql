import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { FilterModel, FilterSchema } from '@models';

export const filterSchema: AsyncModelFactory[] = [
  {
    name: FilterModel.name,
    useFactory: (): MongooseSchema => {
      const schema = FilterSchema;

      return schema;
    },
  },
];
