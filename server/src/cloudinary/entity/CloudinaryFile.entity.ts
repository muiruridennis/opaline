import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // Marks this class as a GraphQL ObjectType
@Entity()
export class CloudinaryFile {
  @PrimaryGeneratedColumn()
  @Field(() => Int)  
  public id: number;

  @Column()
  @Field()  
  public url: string;

  @Column()
  @Field()  
  public public_id: string;
}
