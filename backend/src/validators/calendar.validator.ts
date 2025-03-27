import { z } from 'zod';

// Define the CalendarProvider enum for validation
export const CalendarProviderEnum = z.enum(['GOOGLE', 'OUTLOOK']);

// Schema for creating a new calendar
export const createCalendarSchema = z.object({
  userId: z.number().int().positive(),
  provider: CalendarProviderEnum,
  email: z.string().email(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  tokenExpiry: z.string().datetime().nullable().optional(),
  timezone: z.string().nullable().optional(),
});

// Schema for getting calendars by user ID
export const getUserCalendarsSchema = z.object({
  userId: z.string().transform((val) => parseInt(val, 10)),
});

// Schema for calendar ID
export const calendarIdSchema = z.object({
  id: z.string().uuid(),
});

// Schema for updating a calendar
export const updateCalendarSchema = z.object({
  provider: CalendarProviderEnum.optional(),
  email: z.string().email().optional(),
  accessToken: z.string().nullable().optional(),
  refreshToken: z.string().nullable().optional(),
  tokenExpiry: z.string().datetime().nullable().optional(),
  timezone: z.string().nullable().optional(),
});

// Export the types from the schemas
export type CreateCalendarInput = z.infer<typeof createCalendarSchema>;
export type UpdateCalendarInput = z.infer<typeof updateCalendarSchema>;
export type GetUserCalendarsInput = z.infer<typeof getUserCalendarsSchema>;
export type CalendarIdInput = z.infer<typeof calendarIdSchema>; 