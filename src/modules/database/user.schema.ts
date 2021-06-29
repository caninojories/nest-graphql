import { AsyncModelFactory } from '@nestjs/mongoose';
import { HookNextFunction, Schema as MongooseSchema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel, UserSchema, UserDocument } from '@src/models/user.model';

export const userSchema: AsyncModelFactory[] = [
  {
    name: UserModel.name,
    useFactory: (): MongooseSchema => {
      const schema: MongooseSchema = UserSchema;
      schema.pre<UserDocument>('save', async function (next: HookNextFunction) {
        try {
          if (!this.isModified('password')) {
            return next();
          }

          const hashed = await bcrypt.hash((<UserModel>this).password, 10);
          this.password = hashed;
          return next();
        } catch (err) {
          return next(err);
        }
      });

      schema.methods.validatePassword = async function validatePassword(
        password: string,
      ) {
        return bcrypt.compare(password, (<UserDocument>this).password);
      };

      return schema;
    },
  },
];
