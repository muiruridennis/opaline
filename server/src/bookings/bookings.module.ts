import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entity/booking.entity';
import { UsersModule } from '../users/users.module';
import { ProviderServicesModule } from './../providerServices/providerServices.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UsersModule,
    ProviderServicesModule,
    NotificationsModule
  ],
  providers: [BookingsService, BookingsResolver],
  exports: [BookingsService]
})
export class BookingsModule {}
