import { AsyncModelFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { ContactModel, ContactSchema } from '@models';

export const contactSchema: AsyncModelFactory[] = [
  {
    name: ContactModel.name,
    useFactory: (): MongooseSchema => {
      const schema = ContactSchema;

      return schema;
    },
  },
];
