import { Request, Response } from 'express';
import { CalendarService } from '../services/calendar.service';
import {
  createCalendarSchema,
  updateCalendarSchema,
  calendarIdSchema,
  CreateCalendarInput
} from '../validators/calendar.validator';
import { ZodError } from 'zod';

// Initialize the calendar service
const calendarService = new CalendarService();

/**
 * Get all calendars with optional filtering by userId
 */
const getCalendars = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract userId from query params if present
    const userId = req.query.userId ? parseInt(req.query.userId as string, 10) : undefined;
    
    // Validate userId if provided
    if (req.query.userId && isNaN(userId as number)) {
      res.status(400).json({ message: 'Invalid user ID format' });
      return;
    }
    
    const calendars = await calendarService.getAllCalendars(userId);
    res.status(200).json(calendars);
  } catch (error) {
    console.error('Error getting calendars:', error);
    res.status(500).json({ message: 'Error getting calendars' });
  }
};

/**
 * Get calendar by ID
 */
const getCalendarById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate the ID parameter
    const result = calendarIdSchema.safeParse({ id: req.params.id });
    
    if (!result.success) {
      res.status(400).json({ 
        message: 'Invalid calendar ID format',
        errors: result.error.format()
      });
      return;
    }
    
    const calendar = await calendarService.getCalendarById(req.params.id);
    
    if (!calendar) {
      res.status(404).json({ message: 'Calendar not found' });
      return;
    }
    
    res.status(200).json(calendar);
  } catch (error) {
    console.error('Error getting calendar:', error);
    res.status(500).json({ message: 'Error getting calendar' });
  }
};

/**
 * Create a new calendar connection
 */
const createCalendar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const validationResult = createCalendarSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json({ 
        message: 'Invalid calendar data',
        errors: validationResult.error.format()
      });
      return;
    }
    
    const { tokenExpiry, ...restData } = validationResult.data;
    
    // Set the connectedAt date to now and convert tokenExpiry to Date if present
    const calendarData = {
      ...restData,
      tokenExpiry: tokenExpiry ? new Date(tokenExpiry) : null,
      connectedAt: new Date()
    };
    
    // Create the calendar
    const calendar = await calendarService.createCalendar(calendarData);
    
    res.status(201).json(calendar);
  } catch (error) {
    console.error('Error creating calendar:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Foreign key constraint failed')) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    
    res.status(500).json({ message: 'Error creating calendar' });
  }
};

/**
 * Update a calendar
 */
const updateCalendar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate ID
    const idResult = calendarIdSchema.safeParse({ id: req.params.id });
    
    if (!idResult.success) {
      res.status(400).json({ 
        message: 'Invalid calendar ID format',
        errors: idResult.error.format()
      });
      return;
    }
    
    // Validate request body
    const validationResult = updateCalendarSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json({ 
        message: 'Invalid update data',
        errors: validationResult.error.format()
      });
      return;
    }
    
    // Check if calendar exists
    const existingCalendar = await calendarService.getCalendarById(req.params.id);
    
    if (!existingCalendar) {
      res.status(404).json({ message: 'Calendar not found' });
      return;
    }
    
    const { tokenExpiry, ...restData } = validationResult.data;
    
    // Convert tokenExpiry to Date if present
    const updateData = {
      ...restData,
      tokenExpiry: tokenExpiry ? new Date(tokenExpiry) : undefined
    };
    
    // Update the calendar
    const calendar = await calendarService.updateCalendar(
      req.params.id,
      updateData
    );
    
    res.status(200).json(calendar);
  } catch (error) {
    console.error('Error updating calendar:', error);
    res.status(500).json({ message: 'Error updating calendar' });
  }
};

/**
 * Delete a calendar connection
 */
const deleteCalendar = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate ID
    const result = calendarIdSchema.safeParse({ id: req.params.id });
    
    if (!result.success) {
      res.status(400).json({ 
        message: 'Invalid calendar ID format',
        errors: result.error.format()
      });
      return;
    }
    
    // Check if calendar exists
    const existingCalendar = await calendarService.getCalendarById(req.params.id);
    
    if (!existingCalendar) {
      res.status(404).json({ message: 'Calendar not found' });
      return;
    }
    
    // Delete the calendar
    await calendarService.deleteCalendar(req.params.id);
    
    // Return 204 No Content on successful deletion
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting calendar:', error);
    res.status(500).json({ message: 'Error deleting calendar' });
  }
};

export {
  getCalendars,
  getCalendarById,
  createCalendar,
  updateCalendar,
  deleteCalendar
}; 