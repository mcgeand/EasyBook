import { Request, Response } from 'express';
import { prisma } from '../index';
import { BookingService } from '../services/booking.service';

const bookingService = new BookingService();

// Get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting bookings:', error);
    res.status(500).json({ message: 'Error getting bookings' });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    const booking = await bookingService.getBookingById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error getting booking:', error);
    res.status(500).json({ message: 'Error getting booking' });
  }
};

// Get bookings by user ID
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const bookings = await bookingService.getBookingsByUserId(userId);
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    res.status(500).json({ message: 'Error getting user bookings' });
  }
};

// Create new booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { title, description, startTime, endTime, userId } = req.body;
    
    const booking = await bookingService.createBooking({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      userId
    });
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
};

// Update booking
export const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    const { title, description, startTime, endTime } = req.body;
    
    // Check if booking exists
    const existingBooking = await bookingService.getBookingById(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const booking = await bookingService.updateBooking(bookingId, {
      title,
      description,
      startTime: startTime ? new Date(startTime) : undefined,
      endTime: endTime ? new Date(endTime) : undefined
    });
    
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Error updating booking' });
  }
};

// Delete booking
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = parseInt(req.params.id);
    
    // Check if booking exists
    const existingBooking = await bookingService.getBookingById(bookingId);
    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    await bookingService.deleteBooking(bookingId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking' });
  }
}; 