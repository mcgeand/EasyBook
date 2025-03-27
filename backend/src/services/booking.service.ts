import { prisma } from '../index';

interface BookingCreateData {
  startTime: Date;
  endTime: Date;
  status?: string;
  notes?: string;
  userId: number;
  serviceId: number;
}

interface BookingUpdateData {
  startTime?: Date;
  endTime?: Date;
  status?: string;
  notes?: string;
  serviceId?: number;
}

export class BookingService {
  async getAllBookings() {
    return prisma.booking.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password field
          }
        }
      }
    });
  }

  async getBookingById(id: number) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password field
          }
        }
      }
    });
  }

  async getBookingsByUserId(userId: number) {
    return prisma.booking.findMany({
      where: {
        userId
      },
      orderBy: {
        startTime: 'asc'
      }
    });
  }

  async createBooking(data: BookingCreateData) {
    return prisma.booking.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password field
          }
        }
      }
    });
  }

  async updateBooking(id: number, data: BookingUpdateData) {
    return prisma.booking.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            // Exclude password field
          }
        }
      }
    });
  }

  async deleteBooking(id: number) {
    return prisma.booking.delete({
      where: { id }
    });
  }
} 