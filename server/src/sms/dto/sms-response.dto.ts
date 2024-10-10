import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SmsResponse {
  @Field()
  status: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
