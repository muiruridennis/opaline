import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import Provider from '../../users/entity/provider.entity';
import { ServiceCategoryEnum } from '../provider-service-category.enum';
import { CloudinaryFile } from '../../cloudinary/entity/CloudinaryFile.entity';
import { Booking } from '../../bookings/entity/booking.entity';

@Entity()
export default class Providerservice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  duration: string;

  @Column({ type: 'enum', enum: ServiceCategoryEnum })
  serviceCategory: ServiceCategoryEnum;


  @ManyToOne(() => CloudinaryFile, { nullable: true })
  @JoinColumn({ name: 'heroId' })
  hero: CloudinaryFile;

  @Column('json', { nullable: true })
  benefits: { benefit: string }[];

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('json', { nullable: true })
  faqs: { question: string; answer: string }[];

  @Column({ nullable: true })
  isActive: false

  @Column('timestamp', { nullable: true })
  startDate: Date;

  @Column('timestamp', { nullable: true })
  endDate: Date;

  @ManyToOne(() => Provider, (provider) => provider.services)
  provider: Provider;


  @OneToMany(() => Booking, (booking) => booking.service, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  bookings: Booking[];
}
