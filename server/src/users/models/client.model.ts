import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Review } from '../../reviews/models/review.model'; // Adjust import path as needed

@ObjectType()
export class Client {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Review])
  reviews: Review[];
}
