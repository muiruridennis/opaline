import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Notification {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column()
  timestamp: string;

  @Field()
  @Column({ default: false })
  isRead: boolean;

  @Field()
  @Column()
  category: string; 
}
