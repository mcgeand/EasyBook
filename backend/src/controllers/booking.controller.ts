import { Request, Response } from 'express';
import { prisma } from '../index';
import { BookingService } from '../services/booking.service';

interface BookingCreateRequest {
  startTime: string; // ISO string format
  endTime: string; // ISO string format
  status?: string;
  notes?: string;
  userId: number;
  serviceId: number;
}

interface BookingUpdateRequest {
  startTime?: string; // ISO string format
  endTime?: string; // ISO string format
  status?: string;
  notes?: string;
  serviceId?: number;
}

const bookingService = new BookingService();

// Get all bookings
const getBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ message: 'Error getting bookings' });
  }
};

// Get booking by ID
const getBookingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = parseInt(req.params.id);
    
    if (isNaN(bookingId)) {
      res.status(400).json({ message: 'Invalid booking ID' });
      return;
    }
    
    const booking = await bookingService.getBookingById(bookingId);
    
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ message: 'Error getting booking' });
  }
};

// Get bookings by user ID
const getUserBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    
    const bookings = await bookingService.getBookingsByUserId(userId);
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    res.status(500).json({ message: 'Error getting user bookings' });
  }
};

// Create new booking
const createBooking = async (req: Request<{}, {}, BookingCreateRequest>, res: Response): Promise<void> => {
  try {
    const { startTime, endTime, status, notes, userId, serviceId } = req.body;
    
    if (!startTime || !endTime || !userId || !serviceId) {
      res.status(400).json({ message: 'Start time, end time, user ID, and service ID are required' });
      return;
    }
    
    // Validate dates
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      res.status(400).json({ message: 'Invalid date format' });
      return;
    }
    
    if (startDate >= endDate) {
      res.status(400).json({ message: 'End time must be after start time' });
      return;
    }
    
    const booking = await bookingService.createBooking({
      startTime: startDate,
      endTime: endDate,
      status,
      notes,
      userId,
      serviceId
    });
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Update booking
const updateBooking = async (req: Request<{ id: string }, {}, BookingUpdateRequest>, res: Response): Promise<void> => {
  try {
    const bookingId = parseInt(req.params.id);
    
    if (isNaN(bookingId)) {
      res.status(400).json({ message: 'Invalid booking ID' });
      return;
    }
    
    const { startTime, endTime, status, notes, serviceId } = req.body;
    
    if (!startTime && !endTime && !status && !notes && !serviceId) {
      res.status(400).json({ message: 'At least one field is required to update' });
      return;
    }
    
    // Check if booking exists
    const existingBooking = await bookingService.getBookingById(bookingId);
    if (!existingBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    
    // Validate dates if provided
    let startDate = undefined;
    let endDate = undefined;
    
    if (startTime) {
      startDate = new Date(startTime);
      if (isNaN(startDate.getTime())) {
        res.status(400).json({ message: 'Invalid start time format' });
        return;
      }
    }
    
    if (endTime) {
      endDate = new Date(endTime);
      if (isNaN(endDate.getTime())) {
        res.status(400).json({ message: 'Invalid end time format' });
        return;
      }
    }
    
    // If both dates are provided, check that start is before end
    if (startDate && endDate && startDate >= endDate) {
      res.status(400).json({ message: 'End time must be after start time' });
      return;
    }
    
    const booking = await bookingService.updateBooking(bookingId, {
      startTime: startDate,
      endTime: endDate,
      status,
      notes,
      serviceId
    });
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// Delete booking
const deleteBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookingId = parseInt(req.params.id);
    
    if (isNaN(bookingId)) {
      res.status(400).json({ message: 'Invalid booking ID' });
      return;
    }
    
    // Check if booking exists
    const existingBooking = await bookingService.getBookingById(bookingId);
    if (!existingBooking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }
    
    await bookingService.deleteBooking(bookingId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
};

export {
  getBookings,
  getBookingById,
  getUserBookings,
  createBooking,
  updateBooking,
  deleteBooking
}; 