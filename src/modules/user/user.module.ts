import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailScalar } from '@scalars/email.scalar';
import { User, UserSchema, UserDocument } from './models/user.model';
import { HookNextFunction, Schema as MongooseSchema } from 'mongoose';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema: MongooseSchema = UserSchema;
          schema.pre<UserDocument>(
            'save',
            async function (next: HookNextFunction) {
              try {
                if (!this.isModified('password')) {
                  return next();
                }

                const hashed = await bcrypt.hash((this as User).password, 10);
                this.password = hashed;
                return next();
              } catch (err) {
                return next(err);
              }
            },
          );

          schema.methods.validatePassword = async function validatePassword(
            password: string,
          ) {
            return bcrypt.compare(password, (this as UserDocument).password);
          };

          return schema;
        },
      },
    ]),
  ],
  providers: [UserService, UserResolver, EmailScalar],
  exports: [
    UserService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule {}
