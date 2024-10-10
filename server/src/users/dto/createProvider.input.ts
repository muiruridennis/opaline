import { InputType, Field } from '@nestjs/graphql';
import { CreateCertificationInput } from './certification.input';
import { CreateServiceInput } from '../../providerServices/dto/providerService.input';
import { CreateReviewInput } from '../../reviews/dto/review.input';
import { SocialMediaInput } from './social-media.input'; 


@InputType()
export class CreateProviderInput {
  @Field()
  description: string;

  @Field()
  businessName: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [CreateCertificationInput], { nullable: true })
  certifications?: CreateCertificationInput[];

  @Field({ nullable: true })
  approach?: string;

  @Field(() => SocialMediaInput, { nullable: true })
  socialMedia?: SocialMediaInput;

  @Field(() => [CreateServiceInput], { nullable: true })
  services?: CreateServiceInput[];

  @Field(() => [CreateReviewInput], { nullable: true })
  reviews?: CreateReviewInput[];
}


