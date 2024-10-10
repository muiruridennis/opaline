import {IsEmail, IsNotEmpty} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
;
@InputType()
export class ForgotPasswordDto {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}