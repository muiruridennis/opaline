import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user: User;

  @Field()
  message: string;
}
