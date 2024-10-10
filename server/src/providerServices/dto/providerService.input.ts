import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
import { ServiceCategoryEnum } from '../provider-service-category.enum';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';


@InputType()
class CreateFAQInput {
  @Field()
  @IsNotEmpty()
  question: string;

  @Field()
  @IsNotEmpty()
  answer: string;
}


@InputType()
class Benefit {
  @Field()
  benefit: string;
}
@InputType()
export class CreateServiceInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field()
  @IsNumber()
  price: number;

  @Field()
  @IsString()
  duration: string;

  @Field(() => ServiceCategoryEnum)
  @IsEnum(ServiceCategoryEnum)
  serviceCategory: ServiceCategoryEnum;
  @Field(() => [Benefit], { nullable: true })
  @IsOptional()
  benefits?: Benefit[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[];

  @Field(() => [CreateFAQInput], { nullable: true })
  @IsOptional()
  faqs?: CreateFAQInput[];

  @Field({ nullable: true })
  @IsOptional()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  endDate?: Date;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsOptional()
  file?: FileUpload;
}