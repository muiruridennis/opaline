import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Role } from '../roles.interface';
import { Provider } from './provider.model';
import { Client } from './client.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true }) 
  phoneNumber?: string;

  @Field(() => Role) 
  role: Role;

  @Field(() => Provider, { nullable: true }) 
  provider?: Provider;

  @Field(() => Client, { nullable: true }) 
  client?: Client;
}
