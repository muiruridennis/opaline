
import Provider from '../../users/entity/provider.entity';
import Client from '../../users/entity/client.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Providerservice from '../../providerServices/entity/providerServices.entity';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.bookings)
  client: Client;

  @ManyToOne(() => Provider, (provider) => provider.bookings)
  provider: Provider;

  @ManyToOne(() => Providerservice, (providerservice) => providerservice.bookings)
  service: Providerservice;

  @Column({ type: 'timestamp' })
  bookingDateTime: Date;// Time slot (e.g., '14:00')

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
