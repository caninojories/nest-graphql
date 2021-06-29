import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PayLoad } from '@shared/interfaces';
import { sign } from 'jsonwebtoken';
import { UserModel } from '@models/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: PayLoad): Promise<string> {
    return sign(payload, 'secretKey', { expiresIn: '12h' });
  }

  async validateUser(payload: PayLoad): Promise<UserModel> {
    return await this.userService.findByPayload(payload);
  }
}
