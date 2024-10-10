import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResetPasswordResponse {
    @Field()
    success: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    error?: string;
}
