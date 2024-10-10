import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Providerservice } from '../../providerServices/models/providerService.model';
import { Review } from '../../reviews/models/review.model';
import { Certification } from './certification.model';
import { SocialMedia } from './socialMedia.model';


@ObjectType()
export class Provider {
  @Field(() => Int)
  id: number;

  @Field()
  description: string;

  @Field()
  businessName: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Certification], { nullable: true })
  certifications?: Certification[];

  @Field({ nullable: true })
  approach?: string;

  @Field(() => SocialMedia, { nullable: true })
  socialMedia?: SocialMedia;

  @Field(() => [Providerservice], { nullable: true })
  services?: Providerservice[];

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];
}


