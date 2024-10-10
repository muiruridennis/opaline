import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsDate } from 'class-validator';

@InputType()
export class CreateCertificationInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  issuingOrganization: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  dateIssued?: Date;
}
