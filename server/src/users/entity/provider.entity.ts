import { Entity, Column, OneToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Service from '../../providerServices/entity/providerServices.entity';
import Review from "../../reviews/entity/reviews.entity";
import User from './user.entity';
import Certification from './certification.entity';
import { Booking } from '../../bookings/entity/booking.entity';

@Entity()
export default class Provider {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  description: string;

  @Column()
  businessName: string;

  @Column('text', { nullable: true })
  bio: string;

  @OneToMany(() => Certification, (certification) => certification.provider, {
    nullable: true,
    eager: true,
    cascade: true
  })
  certifications: Certification[];

  @Column('text', { nullable: true })
  approach: string;

  @Column('json', { nullable: true })
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };

  @OneToMany(() => Service, (service) => service.provider, {
    nullable: true,
    eager: true,
    cascade: true
  })
  services: Service[];

  @OneToMany(() => Review, (review) => review.provider, {
    nullable: true,
    eager: true,
    cascade: true
  })
  reviews: Review[];

  @OneToOne(() => User, (user) => user.provider)
  user: User;

  @OneToMany(() => Booking, (booking) => booking.provider, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  bookings: Booking[];
}
