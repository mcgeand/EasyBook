import { Request, Response } from 'express';
import { prisma } from '../index';

interface ServiceCreateRequest {
  name: string;
  description?: string;
  price: number;
  duration: number;
  available?: boolean;
}

interface ServiceUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  available?: boolean;
}

// Get all services
const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await prisma.service.findMany();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error getting services:', error);
    res.status(500).json({ message: 'Error getting services' });
  }
};

// Get service by ID
const getServiceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      res.status(400).json({ message: 'Invalid service ID' });
      return;
    }
    
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error('Error getting service:', error);
    res.status(500).json({ message: 'Error getting service' });
  }
};

// Create new service
const createService = async (req: Request<{}, {}, ServiceCreateRequest>, res: Response): Promise<void> => {
  try {
    const { name, description, price, duration, available } = req.body;
    
    if (!name || price === undefined || duration === undefined) {
      res.status(400).json({ message: 'Name, price, and duration are required' });
      return;
    }
    
    if (price < 0) {
      res.status(400).json({ message: 'Price cannot be negative' });
      return;
    }
    
    if (duration <= 0) {
      res.status(400).json({ message: 'Duration must be positive' });
      return;
    }
    
    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        duration,
        available: available !== undefined ? available : true
      }
    });
    
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Error creating service' });
  }
};

// Update service
const updateService = async (req: Request<{ id: string }, {}, ServiceUpdateRequest>, res: Response): Promise<void> => {
  try {
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      res.status(400).json({ message: 'Invalid service ID' });
      return;
    }
    
    const { name, description, price, duration, available } = req.body;
    
    if (!name && description === undefined && price === undefined && duration === undefined && available === undefined) {
      res.status(400).json({ message: 'At least one field is required to update' });
      return;
    }
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!existingService) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    
    // Validate price and duration if provided
    if (price !== undefined && price < 0) {
      res.status(400).json({ message: 'Price cannot be negative' });
      return;
    }
    
    if (duration !== undefined && duration <= 0) {
      res.status(400).json({ message: 'Duration must be positive' });
      return;
    }
    
    const service = await prisma.service.update({
      where: { id: serviceId },
      data: {
        name,
        description,
        price,
        duration,
        available
      }
    });
    
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
};

// Delete service
const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceId = parseInt(req.params.id);
    
    if (isNaN(serviceId)) {
      res.status(400).json({ message: 'Invalid service ID' });
      return;
    }
    
    // Check if service exists
    const existingService = await prisma.service.findUnique({
      where: { id: serviceId }
    });
    
    if (!existingService) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }
    
    await prisma.service.delete({
      where: { id: serviceId }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
};

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
}; 