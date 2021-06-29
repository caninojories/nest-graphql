import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { UserModel } from '@src/models/user.model';
import { InsertUserArgs } from './dto';
import { GraphqlAuthGuard } from '../../guards/gql-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Roles('Admin')
  @Query(() => [UserModel])
  async users(): Promise<UserModel[]> {
    return await this.userService.showAll();
  }

  @Mutation(() => UserModel)
  async insertOne(@Args() args: InsertUserArgs): Promise<UserModel> {
    return await this.userService.insertOne(args.user);
  }
}
