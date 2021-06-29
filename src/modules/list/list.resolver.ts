import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { ListService } from './list.service';
import { UseGuards } from '@nestjs/common';
import { ListModel, ContactModel } from '@src/models';
import { GraphqlAuthGuard } from '@guards/gql-auth.guard';
import { InsertOneArgs, FindManyArgs } from './dto';

@UseGuards(GraphqlAuthGuard)
@Resolver(ListModel)
export class ListResolver {
  constructor(private listService: ListService) {}

  @Mutation(() => ListModel)
  async insertOne(
    @Args({ type: () => InsertOneArgs }) { list }: InsertOneArgs,
  ): Promise<ListModel> {
    return await this.listService.insertOne(list);
  }

  @Query(() => [ContactModel])
  async findMany(
    @Args({ type: () => FindManyArgs }) { filters }: FindManyArgs,
  ): Promise<ContactModel[]> {
    return await this.listService.findMany(filters);
  }
}
