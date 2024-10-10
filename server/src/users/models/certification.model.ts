import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Provider } from './provider.model';

@ObjectType()
export class Certification {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  issuingOrganization: string;

  @Field({ nullable: true })
  dateIssued?: Date;

  @Field(() => Provider)
  provider: Provider;
}
