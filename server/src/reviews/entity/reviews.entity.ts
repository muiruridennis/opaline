import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import  Provider  from '../../users/entity/provider.entity';
import Client  from '../../users/entity/client.entity';

@Entity()
export default class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  reviewText: string;

  // Many reviews can be given to one provider
  @ManyToOne(() => Provider, (provider) => provider.reviews)
  provider: Provider;

  // Many reviews can be given by one client
  @ManyToOne(() => Client, (client) => client.reviews)
  client: Client;
}
