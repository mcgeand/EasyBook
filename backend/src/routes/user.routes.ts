import { Router } from 'express';
import { 
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
} from '../controllers/user.controller';

/**
 * User routes
 * Handles all API endpoints for user management
 */
const router = Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/', getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', getUserById);

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 */
router.post('/', createUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update existing user
 * @access  Private
 */
router.put('/:id', updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user
 * @access  Private/Admin
 */
router.delete('/:id', deleteUser);

/**
 * @route   POST /api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', login);

export default router; 