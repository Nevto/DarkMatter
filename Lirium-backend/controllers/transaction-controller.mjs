import { lirium } from "../server.mjs";

export const createTransaction = (req, res, next) => {
    const { amount, sender, recipient } = req.body;

    const newTransaction = lirium.createNewTransaction(amount, sender, recipient);
    
    res.status(201).json({ success: true, data: newTransaction });
};