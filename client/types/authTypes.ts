import { FieldErrors } from 'react-hook-form';
import { loginSchema, signupSchema } from '../schemas';

export type AuthErrors = FieldErrors<typeof loginSchema> | FieldErrors<typeof signupSchema>;
