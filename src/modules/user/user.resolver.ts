import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../../guards/gql-auth.guard';
import { User } from './models/user.model';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { InsertUserArgs } from './dto/insert-user.args';

@UseGuards(GraphqlAuthGuard)
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Roles('Admin')
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.showAll();
  }

  @Mutation(() => User)
  async insertOne(@Args() args: InsertUserArgs): Promise<User> {
    return await this.userService.insertOne(args.user);
  }
}
