import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PayLoad } from '@shared/interfaces';
import { sign } from 'jsonwebtoken';
import { User } from '../user/models/user.model';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: PayLoad): Promise<string> {
    return sign(payload, 'secretKey', { expiresIn: '12h' });
  }

  async validateUser(payload: PayLoad): Promise<User> {
    return await this.userService.findByPayload(payload);
  }
}
