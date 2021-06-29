import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { UserModel, UserDocument } from '@models/user.model';
import {
  ILiteProfile,
  ILinkedInEmailAddress,
  PayLoad,
} from '@shared/interfaces';
import { InsertUserInput } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async showAll(): Promise<UserModel[]> {
    return await this.userModel.find();
  }

  async insertOne(userDto: InsertUserInput): Promise<UserModel> {
    const user: UserDocument = new this.userModel(userDto);

    return await user.save();
  }

  async findByPayload(payLoad: PayLoad): Promise<UserModel> {
    const { email } = payLoad;
    const user: UserModel = await this.userModel.findOne({ email });
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
