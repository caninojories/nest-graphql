import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { CompanyModel, CompanySchema } from '@src/models/company.model';

export const companySchema: AsyncModelFactory[] = [
  {
    name: CompanyModel.name,
    useFactory: (): MongooseSchema => {
      const schema = CompanySchema;

      return schema;
    },
  },
];
