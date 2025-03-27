import { PrismaClient } from '@prisma/client';
import { prisma } from '../index';

// Import CalendarProvider enum type
type CalendarProvider = 'GOOGLE' | 'OUTLOOK';

interface CalendarCreateData {
  userId: number;
  provider: CalendarProvider;
  email: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiry?: Date | null;
  timezone?: string | null;
  connectedAt: Date;
}

interface CalendarUpdateData {
  provider?: CalendarProvider;
  email?: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpiry?: Date | null;
  timezone?: string | null;
}

export class CalendarService {
  /**
   * Get all calendars, optionally filtered by userId
   */
  async getAllCalendars(userId?: number) {
    const filter = userId ? { where: { userId } } : {};
    
    return prisma.calendar.findMany({
      ...filter,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password for security
          }
        }
      }
    });
  }

  /**
   * Get a calendar by its ID
   */
  async getCalendarById(id: string) {
    return prisma.calendar.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password for security
          }
        }
      }
    });
  }

  /**
   * Create a new calendar connection
   */
  async createCalendar(data: CalendarCreateData) {
    return prisma.calendar.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password for security
          }
        }
      }
    });
  }

  /**
   * Update a calendar
   */
  async updateCalendar(id: string, data: CalendarUpdateData) {
    return prisma.calendar.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password for security
          }
        }
      }
    });
  }

  /**
   * Delete a calendar connection
   */
  async deleteCalendar(id: string) {
    return prisma.calendar.delete({
      where: { id }
    });
  }

  /**
   * Get calendars by user ID
   */
  async getCalendarsByUserId(userId: number) {
    return prisma.calendar.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
} 