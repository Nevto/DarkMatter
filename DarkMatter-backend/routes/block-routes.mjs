import express from 'express';
import { mineBlock } from '../controllers/block-controller.mjs';
import { protect } from '../middleware/authorization.mjs';

export const router = express.Router();

router.route('/mine').post(protect, mineBlock)

export default router;