import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CancelBookingInput {
  @Field(() => Int)
  @IsNotEmpty()
  bookingId: number;
}
