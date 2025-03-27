import { prisma } from '../index';

interface UserCreateData {
  email: string;
  password: string;
  name?: string;
}

interface UserUpdateData {
  email?: string;
  name?: string;
}

export class UserService {
  async getAllUsers() {
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

  async getUserById(id: number) {
    return prisma.user.findUnique({
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
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: UserCreateData) {
    // In a real application, hash the password before storing
    return prisma.user.create({
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
  }

  async updateUser(id: number, data: UserUpdateData) {
    return prisma.user.update({
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
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id }
    });
  }
} 