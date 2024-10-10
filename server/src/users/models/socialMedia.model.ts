import {  Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialMedia {
  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  twitter?: string;
}
