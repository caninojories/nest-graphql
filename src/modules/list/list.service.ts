import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ListModel,
  ListDocument,
  ContactModel,
  ContactDocument,
} from '@models';
import { InsertOneInput, FiltersInput } from './dto';
import util from 'util';

@Injectable()
export class ListService {
  constructor(
    @InjectModel(ListModel.name)
    private readonly listModel: Model<ListDocument>,
    @InjectModel(ContactModel.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  async insertOne(listDto: InsertOneInput): Promise<ListModel> {
    const user: ListDocument = new this.listModel(listDto);

    return await user.save();
  }

  async findMany(filtersDto: FiltersInput[]): Promise<ContactModel[]> {
    // Get all filters related to Industry
    const filters = filtersDto.filter((filter) => filter.name === 'Industry');
    const industryMatch = [];
    filters.forEach((industry) => {
      // industry.subFilter
      const categories = industry.subFilter.category;
      const sics = industry.subFilter.sic;
      const naics = industry.subFilter.naics;
      categories.forEach((category) => {
        industryMatch.push({
          'company.industry.category': {
            $eq: category,
          },
        });
      });
      sics.forEach((sic) => {
        industryMatch.push({
          'company.industry.sic': {
            $eq: sic,
          },
        });
      });
      naics.forEach((naic) => {
        industryMatch.push({
          'company.industry.naics': {
            $eq: naic,
          },
        });
      });
    });

    const aggregate = [
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
          $or: [...industryMatch],
        },
      },
    ];

    const result = await this.contactModel.aggregate(aggregate);
    // console.log(util.inspect([...industryMatch], false, null, true /* enable colors */))

    return result;
  }
}
