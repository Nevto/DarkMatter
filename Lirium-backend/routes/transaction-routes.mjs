import express from 'express';
import { createTransaction } from '../controllers/transaction-controller.mjs';

const router = express.Router();

router.route("/").post(createTransaction);

export default router;