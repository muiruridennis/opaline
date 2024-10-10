import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../roles.interface';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  resetLink?: string

  @IsEnum(Role)
  role?: Role;
}
