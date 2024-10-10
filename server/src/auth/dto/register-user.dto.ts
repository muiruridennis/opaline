import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail , IsEnum} from 'class-validator';
import { Role } from '../../users/roles.interface';

@InputType() // Mark this class as a GraphQL input type
export class RegisterUserstDTO {
  @Field() // Expose this field to GraphQL
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(Role)
  role?: Role;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}
