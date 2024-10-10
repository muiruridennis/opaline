import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FeatureFlagType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  isEnabled: boolean;
}
