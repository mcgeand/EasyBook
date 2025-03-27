import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Routes
import bookingRoutes from './routes/booking.routes';
import userRoutes from './routes/user.routes';
import healthRoutes from './routes/health.routes';
import serviceRoutes from './routes/service.routes';

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma client
export const prisma = new PrismaClient();

// Define error handler type
interface ErrorResponse {
  message: string;
  status?: number;
  stack?: string;
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/services', serviceRoutes);

/**
 * Global error handling middleware
 * Processes errors and returns appropriate response
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: ErrorResponse = {
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  };
  const status = (err as any).status || 500;
  res.status(status).json(error);
};

app.use(errorHandler);

/**
 * Not found handler for undefined routes
 */
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start server
const server = app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * Handle graceful shutdown
 * Closes database connections and server
 */
const handleShutdown = async (): Promise<void> => {
  await prisma.$disconnect();
  console.log('Disconnected from database');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

// Register shutdown handlers
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown); 