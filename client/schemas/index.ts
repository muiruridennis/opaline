import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(3, 'Full name is required'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^\+?\d+$/, 'Phone number must contain only digits and optional leading "+"'),
  role: z.enum(['client', 'provider'], { required_error: 'Role is required' }),

})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

const certificationSchema = z.object({
  title: z.string().min(1, "Certification title is required"),
  issuingOrganization: z.string().min(1, "Issuing organization is required"),
  dateIssued: z.string().min(1, "Date issued is required").regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
});

// Provider profile schema
export const providerProfileSchema = z.object({
  businessName: z.string().min(1, 'businessName is required'),
  description: z.string().min(1, 'description is required'),
  bio: z.string().min(1, 'bio is required'),
  approach: z.string().min(1, 'approach is required'),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  twitter: z.string().url().optional(),
  certifications: z.array(certificationSchema).optional(),
});

export const providerServiceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z
  .union([z.string(), z.number()])
  .transform((val) => typeof val === 'string' ? Number(val) : val)
  .refine((val) => val > 0, {
    message: 'Price must be greater than zero',
  }),

  duration: z.string().min(1, 'Duration is required'),
  serviceCategory: z.string().min(1, 'Service Category is required').trim(),
  isActive: z.boolean(),
  tags: z
  .array(z.string().min(1, 'Tag is required')) 
  .optional(),

  benefits: z
    .array(
      z.object({
        benefit: z.string().min(1, 'Benefit is required'),
      })
    )
    .optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, 'Question is required'),
        answer: z.string().min(1, 'Answer is required'),
      })
    )
    .optional(),
    file: z.instanceof(File).nullable().optional(),
});
