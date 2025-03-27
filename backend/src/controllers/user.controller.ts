import { Request, Response } from 'express';
import { prisma } from '../index';
import { UserService } from '../services/user.service';

interface UserCreateRequest {
  email: string;
  password: string;
  name?: string;
}

interface UserUpdateRequest {
  email?: string;
  name?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const userService = new UserService();

/**
 * Get all users
 */
const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    
    const user = await userService.getUserById(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
};

/**
 * Create new user
 */
const createUser = async (req: Request<{}, {}, UserCreateRequest>, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    
    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'User already exists with this email' });
      return;
    }
    
    const user = await userService.createUser({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

/**
 * Update user
 */
const updateUser = async (req: Request<{ id: string }, {}, UserUpdateRequest>, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    
    const { email, name } = req.body;
    
    if (!email && !name) {
      res.status(400).json({ message: 'At least one field is required to update' });
      return;
    }
    
    // Check if user exists
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    const user = await userService.updateUser(userId, { email, name });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

/**
 * Delete user
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }
    
    // Check if user exists
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

/**
 * User login
 */
const login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    
    // Implement actual login logic with JWT in a real application
    const user = await userService.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    
    // Return a mock token for now
    res.status(200).json({
      token: 'mock_jwt_token',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
}; 