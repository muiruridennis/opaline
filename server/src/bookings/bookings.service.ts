import {
    Injectable,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingInput } from './dto/create-booking.input';
import { UsersService } from '../users/users.service';
import { Booking, BookingStatus } from './entity/booking.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { ProviderServices } from './../providerServices/providerServices.service';
import User from '../users/entity/user.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly notificationService: NotificationsService,
        private readonly usersService: UsersService,
        private readonly providerServices: ProviderServices
    ) { }
    async getBookingById(id: number) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ['provider', 'client'],
        })
        if (booking) {
            return booking;
        }
        throw new HttpException(
            'booking not found',
            HttpStatus.NOT_FOUND
        );
    }
    async createBooking(input: CreateBookingInput, user: User) {
        if (user.role !== 'client') {
            throw new ForbiddenException('Only clients can create bookings.');
        }
        const client = await this.usersService.getClientByUserId(user.id);
        
        const service = await this.providerServices.getServiceById(input.serviceId);
        // Check for booking conflicts
        const existingBooking = await this.bookingRepository.findOne({
            where: {
                service: { id: service.id },
                bookingDateTime: input.bookingDateTime,
                status: BookingStatus.CONFIRMED,
            },
        });

        if (existingBooking) {
            throw new BadRequestException('This time slot is already booked.');
        }

        // Optional: Check if the provider is available (additional logic can be added here)

        const newBooking =  this.bookingRepository.create({
            client,
            provider: service.provider,
            service,
            bookingDateTime: input.bookingDateTime,
            status: BookingStatus.PENDING,
        })



        const savedBooking = await this.bookingRepository.save(newBooking);

        // Notify provider about new booking
        // await this.notificationService.createNotification(
        //   service.provider.user,
        //   NotificationType.BOOKING_CREATED,
        //   `New booking from ${client.user.name} for your service "${service.name}" on ${savedBooking.bookingDate.toDateString()} at ${savedBooking.bookingTime}.`,
        // );

        return savedBooking;

    }

    async confirmBooking(bookingId: number, user: User) {
        if (user.role !== 'provider') {
            throw new ForbiddenException('Only providers can confirm bookings.');
        }

        const provider = await this.usersService.getProviderByUserId(user.id);
        const booking =  await this.getBookingById(bookingId);

        if (booking.provider.id !== provider.id) {
            throw new ForbiddenException('You are not authorized to confirm this booking.');
        }

        if (booking.status !== BookingStatus.PENDING) {
            throw new BadRequestException('Only pending bookings can be confirmed.');
        }

        // Update booking status to confirmed
        booking.status = BookingStatus.CONFIRMED;
        await this.bookingRepository.save(booking);

        // Notify client about confirmation
        // await this.notificationService.createNotification(
        //     booking.client.user,
        //     NotificationType.BOOKING_CONFIRMED,
        //     `Your booking for "${booking.serviceName}" on ${booking.bookingDate.toDateString()} at ${booking.bookingTime} has been confirmed by ${provider.businessName}.`,
        // );

        return booking;
    }

    async cancelBooking(bookingId: number, user: User) {
        const booking =  await this.getBookingById(bookingId);

        // Determine if the user is authorized to cancel the booking
        const isClient = user.role === 'client' && booking.client.id === user.client.id;
        const isProvider = user.role === 'provider' && booking.provider.id === user.provider.id;

        if (!isClient && !isProvider) {
            throw new ForbiddenException('You are not authorized to cancel this booking.');
        }

        if (
            booking.status === BookingStatus.CANCELLED ||
            booking.status === BookingStatus.COMPLETED
        ) {
            throw new BadRequestException('Cannot cancel this booking.');
        }

        // Update booking status to cancelled
        booking.status = BookingStatus.CANCELLED;
        await this.bookingRepository.save(booking);

        // Notify the other party about cancellation
        // if (isClient) {
        //     await this.notificationService.createNotification(
        //         booking.provider.user,
        //         NotificationType.BOOKING_CANCELLED,
        //         `Booking for "${booking.serviceName}" on ${booking.bookingDate.toDateString()} at ${booking.bookingTime} has been cancelled by the client.`,
        //     );
        // } else if (isProvider) {
        //     await this.notificationService.createNotification(
        //         booking.client.user,
        //         NotificationType.BOOKING_CANCELLED,
        //         `Booking for "${booking.serviceName}" on ${booking.bookingDate.toDateString()} at ${booking.bookingTime} has been cancelled by the provider.`,
        //     );
        // }

        return booking;
    }

    async getBookingsByUser(user: User) {
        const { provider, client } = user;
    
        if (user.role === 'client') {
            const bookings = await this.bookingRepository.find({
                where: { client: { id: client.id } },
                relations: ['service', 'provider'],
            });
            return bookings;
        } else if (user.role === 'provider') {
            const bookings = await this.bookingRepository.find({
                where: { provider: { id: provider.id } },
                relations: ['service', 'client'], 
            });
            return bookings;
        } else {
            throw new BadRequestException('Invalid user role.');
        }
    }
    
    async deleteBooking(bookingId: number, user: User) {
        const booking =  await this.getBookingById(bookingId);
        const isClient = user.role === 'client' && booking.client.id === user.client.id;
        const isProvider = user.role === 'provider' && booking.provider.id === user.provider.id;

        if (!isClient && !isProvider) {
            throw new ForbiddenException('You are not authorized to delete this booking.');
        }

        await this.bookingRepository.delete(bookingId);
    }
}
