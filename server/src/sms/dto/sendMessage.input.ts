import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  receiverPhoneNumber: string;

  @Field()
  message: string;
}
