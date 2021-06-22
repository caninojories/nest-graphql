import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { User, UserDocument } from './models/user.model';
import { InsertUserInput } from './dto/insert-user.input';
import { PayLoad } from '@shared/interfaces';
import { ILiteProfile, ILinkedInEmailAddress } from '@shared/interfaces';
import { SignupInput } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async showAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async insertOne(userDto: InsertUserInput): Promise<User> {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser: UserDocument = new this.userModel(userDto);
    return await createdUser.save();
  }

  async signup(userDto: SignupInput): Promise<User> {
    const { email } = userDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // (await bcrypt.compare(password, user.password))
    const createdUser: UserDocument = new this.userModel(userDto);
    return await createdUser.save();
  }

  async findByPayload(payLoad: PayLoad): Promise<User> {
    const { email } = payLoad;
    const user: User = await this.userModel.findOne({ email });
    delete user.password;

    return user;
  }

  /**
   *
   * @param {string} token
   * @returns {Promise<ILiteProfile>}
   */
  async linkedInMe(token: string): Promise<ILiteProfile> {
    const response: { data: ILiteProfile } = await axios.get(
      'https://api.linkedin.com/v2/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  /**
   *
   * @param {string} token
   * @returns {Promise<ILinkedInEmailAddress>}
   */
  async linkedInEmailAddress(token: string): Promise<ILinkedInEmailAddress> {
    const response: { data: ILinkedInEmailAddress } = await axios.get(
      'https://api.linkedin.com/v2/clientAwareMemberHandless?q=members&projection=(elements*(primary,type,handle~))',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}
