import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Provider } from '../../users/models/provider.model'; 
import { Client } from '../../users/models/client.model'; 

@ObjectType()
export class Review {
  @Field(() => Int)
  id: number;

  @Field()
  reviewText: string;

  @Field(() => Provider)
  provider: Provider;

  @Field(() => Client)
  client: Client;
}
