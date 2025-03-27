import { z } from 'zod';

/**
 * Schema for creating a user
 */
export const createUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  name: z.string().optional(),
});

/**
 * Schema for updating a user
 */
export const updateUserSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().optional(),
});

/**
 * Schema for user login
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }),
});

/**
 * Type definitions derived from Zod schemas
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>; 