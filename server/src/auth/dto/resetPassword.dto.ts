import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class ResetPasswordDto {
    @Field()
    @IsNotEmpty()
    @IsString()
    resetLink: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;
}