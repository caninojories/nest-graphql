import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  ContactModel,
  ContactDocument,
  CompanyModel,
  CompanyDocument,
} from '@models';

@Injectable()
export class ListFindManyService {
  constructor(
    @InjectModel(ContactModel.name)
    private readonly contactModel: Model<ContactDocument>,
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async seed(): Promise<ContactModel[]> {
    const result = await this.companyModel.insertMany([
      {
        name: 'Agriculture, Forestry, And Fishing Company',
        industry: {
          category: 'Agriculture, Forestry, And Fishing',
          sic: '01-09',
          naics: '11',
        },
      },
      {
        name: 'Mining Company',
        industry: {
          category: 'Mining',
          sic: '10-14',
          naics: '21',
        },
      },
    ]);

    const contact = await this.contactModel.insertMany([
      {
        firstName: 'Test FirstName 1',
        lastName: 'Test LastName 1',
        company: new Types.ObjectId(result[0]._id),
      },
      {
        firstName: 'Test FirstName 2',
        lastName: 'Test LastName 2',
        company: new Types.ObjectId(result[1]._id),
      },
    ]);

    return contact;
  }

  async remove(): Promise<void> {
    await this.companyModel.deleteMany({}).exec();
    await this.contactModel.deleteMany({}).exec();
  }

  async find(): Promise<void> {
    const result = await this.contactModel.aggregate([
      {
        $lookup: {
          from: 'companymodels',
          localField: 'company',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $unwind: '$company',
      },
      {
        $match: {
          $or: [
            {
              'company.name': {
                $eq: 'Mining Company',
              },
            },
            {
              'company.industry.sic': {
                $eq: '01-09',
              },
            },
          ],
        },
      },
    ]);

    console.log(result);
  }
}
