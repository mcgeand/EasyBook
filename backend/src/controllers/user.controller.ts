import { Request, Response } from 'express';
import { prisma } from '../index';
import { UserService } from '../services/user.service';

const userService = new UserService();

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
};

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }
    
    const user = await userService.createUser({ email, password, name });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, name } = req.body;
    
    // Check if user exists
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = await userService.updateUser(userId, { email, name });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Check if user exists
    const existingUser = await userService.getUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await userService.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Implement actual login logic with JWT in a real application
    const user = await userService.getUserByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
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