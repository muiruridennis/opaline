import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { ServiceCategoryEnum } from '../provider-service-category.enum';

@InputType()
class UpdateFAQInput {
  @Field()
  @IsOptional()
  @IsString()
  question?: string;

  @Field()
  @IsOptional()
  @IsString()
  answer?: string;
}

@InputType()
class UpdateBenefitInput {
  @Field()
  benefit: string;
}

@InputType()
export class UpdateServiceInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  duration?: string;

  @Field(() => ServiceCategoryEnum, { nullable: true })
  @IsOptional()
  @IsEnum(ServiceCategoryEnum)
  serviceCategory?: ServiceCategoryEnum;

  @Field(() => [UpdateBenefitInput], { nullable: true })
  @IsOptional()
  benefits?: UpdateBenefitInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => [UpdateFAQInput], { nullable: true })
  @IsOptional()
  faqs?: UpdateFAQInput[];

  @Field({ nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  endDate?: Date;
}


