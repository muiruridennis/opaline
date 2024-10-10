import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    CLIENT = 'client',
    PROVIDER = 'provider',
    ADMIN = 'admin',
  }
  registerEnumType(Role, {
    name: 'Role', 
    description: 'The different roles a user can have',
  });