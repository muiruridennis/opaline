import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ConfirmEmailInput {
  @Field()
  @IsNotEmpty()
  token: string;
}
