import { Field, InputType, ArgsType, OmitType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FilterModel } from '@models';

@InputType()
export class Sub {
  @Field(() => [String])
  category: string[];

  @Field(() => [String])
  sic: string[];

  @Field(() => [String])
  naics: string[];
}

@InputType()
export class FiltersInput {
  @Field()
  name: string;

  @Field(() => Sub)
  @Type(() => Sub)
  @ValidateNested()
  subFilter: Sub;
}

@ArgsType()
export class FindManyArgs {
  @Field(() => [FiltersInput])
  @Type(() => FiltersInput)
  @ValidateNested()
  filters!: FiltersInput[];
}
