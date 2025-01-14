import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteServiceResponse {
    @Field()
    message: string;
    
    @Field()
    success: boolean;
}