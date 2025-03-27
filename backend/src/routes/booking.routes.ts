import { Router } from 'express';
import { 
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings 
} from '../controllers/booking.controller';

const router = Router();

// Get all bookings
router.get('/', getBookings);

// Get booking by ID
router.get('/:id', getBookingById);

// Get bookings by user ID
router.get('/user/:userId', getUserBookings);

// Create new booking
router.post('/', createBooking);

// Update booking
router.put('/:id', updateBooking);

// Delete booking
router.delete('/:id', deleteBooking);

export default router; 