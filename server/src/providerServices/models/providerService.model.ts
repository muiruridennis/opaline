import { IsEnum } from 'class-validator';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Provider } from '../../users/models/provider.model';
import { ServiceCategoryEnum } from '../provider-service-category.enum';
import { CloudinaryFile } from 'src/cloudinary/entity/CloudinaryFile.entity';
import { Booking } from '../../bookings/schema/bookings.schema';

@ObjectType()
export class Faq {
  @Field()
  question: string;

  @Field()
  answer: string;
}
@ObjectType()
class BenefitModel {
  @Field()
  benefit: string;
}

@ObjectType()
export class Providerservice {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field()
  duration: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => ServiceCategoryEnum)
  @IsEnum(ServiceCategoryEnum)
  serviceCategory: ServiceCategoryEnum;

  @Field(() => Provider)
  provider: Provider;
  
  @Field(() => [BenefitModel], { nullable: true })
  benefits?: BenefitModel[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [Faq], { nullable: true })
  faqs?: Faq[];

  @Field(() => CloudinaryFile, { nullable: true })
  hero?: CloudinaryFile


  @Field(() => [Booking])
  bookings: Booking[];
}
