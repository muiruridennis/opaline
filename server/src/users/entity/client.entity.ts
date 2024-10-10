import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Review from "../../reviews/entity/reviews.entity";
import User from './user.entity';
import { Booking } from '../../bookings/entity/booking.entity';

@Entity()
export default class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Review, (review) => review.client, {
    nullable: true,
    eager: true,
    cascade: true
  })
  reviews: Review[];

  @OneToOne(() => User, (user) => user.client)
  user: User;
  
  @OneToMany(() => Booking, (booking) => booking.client, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  bookings: Booking[];

}
