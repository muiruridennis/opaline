import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { ConfirmBookingInput } from './dto/confirm-booking.input';
import { CancelBookingInput } from './dto/cancel-booking.input';
import { UseGuards } from '@nestjs/common';
import { Booking } from './schema/bookings.schema';
import { GraphqlJwtAuthGuard } from '../auth/guards/graphql-jwt-auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { BookingResponse } from './dto/bookingResponse.input';

@Resolver(() => Booking)
@UseGuards(GraphqlJwtAuthGuard)
export class BookingsResolver {
    constructor(private readonly bookingsService: BookingsService) { }

    @Mutation(() => Booking)
    async createBooking(
        @Args('input') input: CreateBookingInput,
        @Context() context: { req: RequestWithUser },
    ) {
        const user = context.req.user;

        return this.bookingsService.createBooking(input, user);
    }

    @Mutation(() => BookingResponse)
    async confirmBooking(
        @Args('input') input: ConfirmBookingInput,
        @Context() context: { req: RequestWithUser },
    ) {
        const user = context.req.user
        await this.bookingsService.confirmBooking(input.bookingId, user);
        return {
            success: true,
            message: 'Booking Cornfirmed successfully.',
        };
    }

    @Mutation(() => BookingResponse)
    async cancelBooking(
        @Args('input') input: CancelBookingInput,
        @Context() context: { req: RequestWithUser },
    ) {
        const user = context.req.user
        await this.bookingsService.cancelBooking(input.bookingId, user);
        return {
            success: true,
            message: 'Booking Canceled successfully.',
        };
    }

    @Query(() => [Booking])
    async getBookings(
        @Context() context: { req: RequestWithUser }) {
        const user = context.req.user

        return this.bookingsService.getBookingsByUser(user);
    }

    @Mutation(() => BookingResponse)
    async deleteBooking(
        @Args('bookingId') bookingId: number,
        @Context() context: { req: RequestWithUser },
    ) {
        const user = context.req.user;
        await this.bookingsService.deleteBooking(bookingId, user);
        return {
            success: true,
            message: 'Booking deleted successfully.',
        };
    }
}
