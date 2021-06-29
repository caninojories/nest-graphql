import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  UserModel,
} from '@models';
import { UserService } from '@modules/user/user.service';
import { EmailScalar } from '@scalars/email.scalar';

@Injectable()
export class AuthenticatedUserService {
  constructor(private userService: UserService) {}

  async createAuthenticatedUser(): Promise<UserModel> {
    return this.userService.insertOne({
      email: <EmailScalar>(<unknown>`test${uuidv4()}@test.com`),
      firstName: 'John',
      lastName: 'Doe',
    });
  }
}
