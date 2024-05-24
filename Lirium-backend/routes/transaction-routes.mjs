import express from 'express';
import { broadcastTransaction, createTransaction } from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route("/").post(createTransaction);
router.route("/broadcast").post(broadcastTransaction);

export default router;