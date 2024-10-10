import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType() 
export class LogInDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LogInDto;