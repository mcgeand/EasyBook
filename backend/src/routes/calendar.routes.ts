import express from 'express';
import {
  getCalendars,
  getCalendarById,
  createCalendar,
  updateCalendar,
  deleteCalendar
} from '../controllers/calendar.controller';

const router = express.Router();

// Define calendar routes
router.get('/', getCalendars);
router.get('/:id', getCalendarById);
router.post('/', createCalendar);
router.put('/:id', updateCalendar);
router.delete('/:id', deleteCalendar);

export default router; 