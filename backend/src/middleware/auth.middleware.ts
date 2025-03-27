import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
}

/**
 * Interface extending Express Request with user field
 */
export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}

/**
 * Middleware to verify JWT token and add user to request
 */
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    
    // Extract token from header
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Authentication token missing' });
      return;
    }
    
    // Verify token
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      console.error('JWT_SECRET is not defined in environment variables');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }
    
    // Decode token
    const decoded = jwt.verify(token, secret) as TokenPayload;
    
    // Add user ID to request
    req.user = {
      id: decoded.userId
    };
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};

/**
 * Admin-only route guard middleware
 * Assumes authenticate middleware has already been applied
 */
export const adminOnly = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // This would check the user's role in a real application
    // For now, we're simply checking if the user ID is 1 (admin)
    if (req.user?.id !== 1) {
      res.status(403).json({ message: 'Admin access required' });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Admin authorization error:', error);
    res.status(500).json({ message: 'Authorization error' });
  }
}; 