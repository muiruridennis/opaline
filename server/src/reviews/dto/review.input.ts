import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  @IsString()
  reviewText: string;

  @Field(() => Int)
  providerId: number;

  @Field(() => Int)
  clientId: number;
}
