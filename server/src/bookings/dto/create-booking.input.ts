
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString, Matches } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field(() => Int)
  @IsNotEmpty()
  serviceId: number;

  @Field()
  @IsNotEmpty()
  bookingDateTime: Date;
}
