import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CheckVerificationCodeInput {
  @Field()
  code: string;
}
