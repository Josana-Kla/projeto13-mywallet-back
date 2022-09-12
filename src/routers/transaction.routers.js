import express from 'express';
import { addCashIn, addCashOut, getHistoryTransactions } from '../controllers/transactions.controller.js';

const router = express.Router();

router.post("/cash-in",addCashIn);
router.post("/cash-out", addCashOut);
router.get("/home", getHistoryTransactions);

export default router;