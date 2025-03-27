import { prisma } from '../index';
import { User } from '@prisma/client';

/**
 * Data required to create a new user
 */
interface UserCreateData {
  email: string;
  password: string;
  name?: string;
}

/**
 * Data that can be updated for a user
 */
interface UserUpdateData {
  email?: string;
  name?: string;
}

/**
 * User data without sensitive information
 */
type SafeUser = Omit<User, 'password'>;

/**
 * Service class for handling user-related operations
 */
export class UserService {
  /**
   * Retrieves all users with sensitive data excluded
   * @returns Array of users without password information
   */
  public getAllUsers = async (): Promise<SafeUser[]> => {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field
      }
    });
  }

  /**
   * Finds a user by their ID with sensitive data excluded
   * @param id - The user ID to search for
   * @returns The user without password information, or null if not found
   */
  public getUserById = async (id: number): Promise<SafeUser | null> => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field
      }
    });
    
    return user;
  }

  /**
   * Finds a user by their email address
   * @param email - The email to search for
   * @returns The complete user object including password, or null if not found
   */
  public getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    return user;
  }

  /**
   * Creates a new user
   * @param data - User data including email, password, and optional name
   * @returns The created user without password information
   */
  public createUser = async (data: UserCreateData): Promise<SafeUser> => {
    // In a real application, hash the password before storing
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field
      }
    });
    
    return user;
  }

  /**
   * Updates an existing user
   * @param id - The ID of the user to update
   * @param data - Data to update, can include email and/or name
   * @returns The updated user without password information
   */
  public updateUser = async (id: number, data: UserUpdateData): Promise<SafeUser> => {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password field
      }
    });
    
    return user;
  }

  /**
   * Deletes a user from the database
   * @param id - The ID of the user to delete
   * @returns The deleted user
   */
  public deleteUser = async (id: number): Promise<User> => {
    const user = await prisma.user.delete({
      where: { id }
    });
    
    return user;
  }
} 