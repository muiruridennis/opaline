import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SocialMediaInput {
  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  twitter?: string;
}
