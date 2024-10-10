import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsString } from 'class-validator';

@InputType()
export class CreateFeatureFlagInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsBoolean()
  isEnabled: boolean;
}
