
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Client } from '../../users/models/client.model';
import { Provider } from '../../users/models/provider.model';
import { Providerservice } from '../../providerServices/models/providerService.model';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}
registerEnumType(BookingStatus, {
  name: 'BookingStatus',
  description: 'The different status a booking can have',
});

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => Client)
  client: Client;

  @Field(() => Provider)
  provider: Provider;

  @Field(() => Providerservice)
  service: Providerservice;

  @Field()
  bookingDateTime: Date;

  @Field()
  bookingTime: string;

  @Field(() => BookingStatus)
  status: BookingStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
