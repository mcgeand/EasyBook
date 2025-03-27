import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint to verify API is running
 * @access  Public
 */
router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok' });
});

export default router; 